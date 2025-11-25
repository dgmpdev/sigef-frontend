import { useMemo, useState } from 'react'
import AuthContext from './authContext.js'
import { tokenService } from '../api/tokenService'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    // TODO: connect to auth service
    setUser({ id: 'demo-user', ...credentials })
  }

  const logout = () => {
    // Clear in-memory user and any persisted tokens so guard won't pass
    setUser(null)
    try {
      tokenService.clear()
    } catch (e) {
      // ignore storage errors
    }
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

