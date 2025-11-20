import { createContext } from 'react'

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
})

export default AuthContext

