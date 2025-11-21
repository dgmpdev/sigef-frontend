import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import ProtectedRoute from './ProtectedRoute'
import { DashboardProvider } from '../contexts/DashboardContext'
import { dashboardRoutes, authRoutes, errorRoutes } from './routes'
import DashboardLayout from '../layouts/DashboardLayout'
import ErrorBoundary from '../components/ErrorBoundary'

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Chargement…</div>}>
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
                <ErrorBoundary>
                  <Suspense fallback={<div>Chargement…</div>}>
                    <route.component />
                  </Suspense>
                </ErrorBoundary>
              </route.layout>
            ) : (
              <ErrorBoundary>
                <Suspense fallback={<div>Chargement…</div>}>
                  <route.component />
                </Suspense>
              </ErrorBoundary>
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
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<div>Chargement…</div>}>
                  <route.component />
                </Suspense>
              }
            />
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
                <Suspense fallback={<div>Chargement…</div>}>
                  <route.component />
                </Suspense>
              </route.layout>
            ) : (
              <Suspense fallback={<div>Chargement…</div>}>
                <route.component />
              </Suspense>
            )
          }
        />
      ))}
    </Routes>
    </Suspense>
  </BrowserRouter>
)

export default AppRouter
