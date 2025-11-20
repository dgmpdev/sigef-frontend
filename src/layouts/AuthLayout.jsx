import { Outlet } from 'react-router-dom'

// AuthLayout can be used either as a wrapper with children or as a parent route rendering an <Outlet />
const AuthLayout = ({ children }) => {
  if (children) return children
  return <Outlet />
}

export default AuthLayout

