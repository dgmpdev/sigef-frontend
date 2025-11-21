import axios from 'axios'
import appConfig from '../config/appConfig'
import { tokenService } from './tokenService'

// Create a dedicated axios instance
const axiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
})

// Attach access token to every request when available, except for public endpoints
axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken()

  // Normalize URL path (may be absolute when retried)
  const url = typeof config.url === 'string' ? config.url : ''
  const isPublic = /\/users\/public\//.test(url)

  // Only attach access token if not a public endpoint and the request didn't provide its own Authorization header
  if (!isPublic && token && !(config.headers && config.headers.Authorization)) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: on 401 try refresh then retry once
let isRefreshing = false
let pendingQueue = []

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  pendingQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config
    const status = error?.response?.status

    // If no original request or already retried, reject
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (status === 401) {
      const userId = tokenService.getUserId()
      const refreshToken = tokenService.getRefreshToken()

      if (!userId || !refreshToken) {
        // Nothing to refresh with
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject })
        })
          .then((newToken) => {
            originalRequest.headers = originalRequest.headers || {}
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            originalRequest._retry = true
            return axiosInstance(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Use base axios to avoid interceptor recursion
        const refreshResponse = await axios.get(
          `${appConfig.apiBaseUrl}/users/refresh-token/${userId}`,
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          },
        )
        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data || {}
        if (!accessToken) throw new Error('No accessToken in refresh response')

        // Persist new tokens
        tokenService.setTokens({ accessToken, refreshToken: newRefreshToken })

        processQueue(null, accessToken)

        // Retry original with new token
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr, null)
        tokenService.clear()
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
