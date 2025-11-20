import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import ProtectedRoute from './ProtectedRoute'
import PageSkeleton from '../components/ui/skeletons/PageSkeleton'
import { DashboardProvider } from '../contexts/DashboardContext'
import { dashboardRoutes, authRoutes, errorRoutes } from './routes'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Routes */}
      {authRoutes.map((route) => {
        if (route.path === '/auth/test') {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <DashboardProvider>
                  <Suspense fallback={<PageSkeleton />}>
                    <route.component />
                  </Suspense>
                </DashboardProvider>
              }
            />
          )
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.layout ? (
                <route.layout>
                  <Suspense fallback={<PageSkeleton />}>
                    <route.component />
                  </Suspense>
                </route.layout>
              ) : (
                <Suspense fallback={<PageSkeleton />}>
                  <route.component />
                </Suspense>
              )
            }
          />
        )
      })}

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        {dashboardRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <DashboardProvider>
                <route.layout>
                  <Suspense fallback={<PageSkeleton />}>
                    <route.component />
                  </Suspense>
                </route.layout>
              </DashboardProvider>
            }
          />
        ))}
      </Route>

      {/* Error Routes */}
      {errorRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.layout ? (
              <route.layout>
                <Suspense fallback={<PageSkeleton />}>
                  <route.component />
                </Suspense>
              </route.layout>
            ) : (
              <Suspense fallback={<PageSkeleton />}>
                <route.component />
              </Suspense>
            )
          }
        />
      ))}
    </Routes>
  </BrowserRouter>
)

export default AppRouter
