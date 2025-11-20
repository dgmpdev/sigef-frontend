import React, { Suspense } from 'react'
import PageWrapper from '../../components/animations/PageWrapper'
import PageSkeleton from '../../components/ui/skeletons/PageSkeleton'
import Sidebar from '../../components/layout/sidebar/Sidebar'
import Navbar from '../../components/layout/navbar/Navbar'
import Footer from '../../components/layout/footer/Footer'
import Hero from '../../components/layout/hero/Hero'
import { useDashboard } from '../../contexts/DashboardContext'
import '../../pages/dashboard/home.css'

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'grid' },
  { id: 'plan', label: 'Plan de formation', icon: 'text' },
  { id: 'demandes', label: 'Demandes de formation', icon: 'inbox' },
  { id: 'catalogue', label: 'Catalogue', icon: 'hexagon' },
  { id: 'settings', label: 'Paramètres', icon: 'gear' },
]

const PlanFormationContent = () => {
  const { collapsed, setCollapsed, active, setActive, darkMode, setDarkMode, greenTheme, setGreenTheme } = useDashboard()

  React.useEffect(() => {
    setActive('plan')
  }, [setActive])

  const handleNavItemClick = (item) => {
    setActive(item.id)
    const heroTitle = document.getElementById('heroTitle')
    if (heroTitle) heroTitle.textContent = item.label
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const classNames = React.useMemo(() => {
    let base = 'dashboard-page'
    if (darkMode) base += ' dark'
    if (greenTheme) base += ' green'
    return base
  }, [darkMode, greenTheme])

  return (
    <div className={classNames}>
      <div className="app" role="application">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
          navItems={navItems}
          active={active}
          onItemClick={handleNavItemClick}
        />

        <main className="main" id="main">
          <Navbar
            onToggleSidebar={() => setCollapsed((prev) => !prev)}
            onDarkModeToggle={() => setDarkMode((prev) => !prev)}
            onThemeToggle={() => setGreenTheme((prev) => !prev)}
          />

          <Hero title="Plan de formation" subtitle="Gérez et consultez le plan annuel de formation" />

          <div className="cards">
            {/* Contenu à venir */}
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--dgmp-gray-400)' }}>
              <p>Contenu du plan de formation à venir...</p>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

const PlanFormation = () => {
  return (
    <PageWrapper>
      <Suspense fallback={<PageSkeleton />}>
        <PlanFormationContent />
      </Suspense>
    </PageWrapper>
  )
}

export default PlanFormation

