import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

const ProtectedRoute = () => {
  const { user } = useAuth()

  // TEMP: Bypass guard to open all routes when env flag is set
  // Set VITE_DISABLE_ROUTE_GUARD=true in your .env.* to enable
  const bypassGuard = import.meta.env.VITE_DISABLE_ROUTE_GUARD === 'true'

  if (bypassGuard) {
    return <Outlet />
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute

