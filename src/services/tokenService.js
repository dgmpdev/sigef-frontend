const TOKEN_KEY = 'sigef_token'

const tokenService = {
  getToken: () => window.localStorage.getItem(TOKEN_KEY),
  setToken: (token) => window.localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => window.localStorage.removeItem(TOKEN_KEY),
}

export default tokenService

