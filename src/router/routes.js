import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import AuthLayout from '../layouts/AuthLayout'

// Lazy loading des pages
const Home = React.lazy(() => import('../pages/dashboard/Home'))
const PlanFormation = React.lazy(() => import('../pages/metier/plans-formation/PlanFormation.jsx'))
const DemandesFormation = React.lazy(() => import('../pages/metier/demandes-formation/DemandesFormation.jsx'))
const Users = React.lazy(() => import('../pages/dashboard/Users'))
const Settings = React.lazy(() => import('../pages/dashboard/Settings'))
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
const NotFound = React.lazy(() => import('../pages/error/NotFound'))

export const dashboardRoutes = [
  {
    path: '/dashboard',
    layout: DashboardLayout,
    component: Home,
  },
  {
    path: '/plans-formation',
    layout: DashboardLayout,
    component: PlanFormation,
  },
  {
    path: '/demandes-formation',
    layout: DashboardLayout,
    component: DemandesFormation,
  },
  {
    path: '/dashboard/users',
    layout: DashboardLayout,
    component: Users,
  },
  {
    path: '/dashboard/settings',
    layout: DashboardLayout,
    component: Settings,
  },
]

export const authRoutes = [
  {
    path: '/auth/login',
    layout: AuthLayout,
    component: Login,
  },
  {
    path: '/auth/register',
    layout: AuthLayout,
    component: Register,
  },
  {
    path: '/auth/forgot-password',
    layout: AuthLayout,
    component: ForgotPassword,
  },
  {
    path: '/auth/test',
    layout: null, // Pas de layout pour la route de test, on utilise DashboardProvider directement
    component: Home, // Route de test qui affiche Home
  },
]

export const errorRoutes = [
  {
    path: '*',
    layout: null,
    component: NotFound,
  },
]

export default [...dashboardRoutes, ...authRoutes, ...errorRoutes]

