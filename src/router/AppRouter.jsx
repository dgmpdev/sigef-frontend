import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { DashboardProvider } from '../contexts/DashboardContext'
import { dashboardRoutes, authRoutes, errorRoutes } from './routes'
import DashboardLayout from '../layouts/DashboardLayout'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Routes */}
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.layout ? (
              <route.layout>
                <route.component />
              </route.layout>
            ) : (
              <route.component />
            )
          }
        />
      ))}

      {/* Protected Dashboard Area with persistent layout */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <DashboardProvider>
              <DashboardLayout />
            </DashboardProvider>
          }
        >
          {dashboardRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Route>
      </Route>

      {/* Error Routes */}
      {errorRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.layout ? (
              <route.layout>
                <route.component />
              </route.layout>
            ) : (
              <route.component />
            )
          }
        />
      ))}
    </Routes>
  </BrowserRouter>
)

export default AppRouter
