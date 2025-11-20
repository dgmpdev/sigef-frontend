// Simple token service using localStorage
// Keys used to persist auth data
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_ID_KEY = 'userId'

export const tokenService = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || null
  },
  getUserId() {
    const raw = localStorage.getItem(USER_ID_KEY)
    return raw ? JSON.parse(raw) : null
  },
  setTokens({ accessToken, refreshToken }) {
    if (accessToken != null) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    if (refreshToken != null) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },
  setUserId(userId) {
    if (userId != null) localStorage.setItem(USER_ID_KEY, JSON.stringify(userId))
  },
  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
  },
}

export default tokenService
