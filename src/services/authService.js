import authApi from '../api/authApi.js'
import tokenService from './tokenService.js'

const authService = {
  async login(credentials) {
    const { token, user } = await authApi.login(credentials)
    if (token) tokenService.setToken(token)
    return user
  },
  async logout() {
    tokenService.clearToken()
  },
}

export default authService

