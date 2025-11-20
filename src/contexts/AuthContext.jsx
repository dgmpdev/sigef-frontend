import { useMemo, useState } from 'react'
import AuthContext from './authContext.js'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    // TODO: connect to auth service
    setUser({ id: 'demo-user', ...credentials })
  }

  const logout = () => {
    setUser(null)
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

