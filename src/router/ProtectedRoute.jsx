import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

const ProtectedRoute = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute

