import axios from 'axios'
import appConfig from '../config/appConfig.js'
import tokenService from '../services/tokenService.js'

const axiosClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
})

axiosClient.interceptors.request.use((config) => {
  const token = tokenService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)

export default axiosClient

