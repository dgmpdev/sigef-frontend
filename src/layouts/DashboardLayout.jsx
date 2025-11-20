import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect, useMemo } from 'react'
import { useDashboard } from '../contexts/DashboardContext'
import Sidebar from '../components/layout/sidebar/Sidebar'
import Navbar from '../components/layout/navbar/Navbar'
import Footer from '../components/layout/footer/Footer'
import PageSkeleton from '../components/ui/skeletons/PageSkeleton'

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'grid' },
  { id: 'plan', label: 'Plan de formation', icon: 'text' },
  { id: 'demandes', label: 'Demandes de formation', icon: 'inbox' },
  { id: 'catalogue', label: 'Catalogue', icon: 'hexagon' },
  { id: 'settings', label: 'Paramètres', icon: 'gear' },
]

const DashboardLayout = ({ children }) => {
  const { collapsed, setCollapsed, active, setActive, darkMode, setDarkMode, greenTheme, setGreenTheme } = useDashboard()
  const location = useLocation()

  // Déterminer l'onglet actif depuis l'URL pour éviter les remises à zéro visuelles
  const activeFromPath = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/plan-formation')) return 'plan'
    if (path.startsWith('/demandes-formation')) return 'demandes'
    if (path.startsWith('/formations')) return 'catalogue'
    if (path.startsWith('/dashboard/settings')) return 'settings'
    return 'dashboard'
  }, [location.pathname])

  useEffect(() => {
    if (active !== activeFromPath) setActive(activeFromPath)
  }, [activeFromPath, active, setActive])

  const classNames = useMemo(() => {
    let base = 'dashboard-page'
    if (darkMode) base += ' dark'
    if (greenTheme) base += ' green'
    return base
  }, [darkMode, greenTheme])

  const handleSidebarToggle = () => setCollapsed((prev) => !prev)
  const handleNavItemClick = (item) => {
    setActive(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Si on est utilisé en wrapper direct
  if (children) return children

  return (
    <div className={classNames}>
      <div className="app" role="application">
        <Sidebar
          collapsed={collapsed}
          onToggle={handleSidebarToggle}
          navItems={navItems}
          active={activeFromPath}
          onItemClick={handleNavItemClick}
        />

        <main className="main" id="main">
          <Navbar
            onToggleSidebar={handleSidebarToggle}
            onDarkModeToggle={() => setDarkMode((prev) => !prev)}
            onThemeToggle={() => setGreenTheme((prev) => !prev)}
          />

          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
