import { useEffect, useMemo, useState } from 'react'
import { Suspense } from 'react'
import './home.css'
import PageWrapper from '../../components/animations/PageWrapper'
import PageSkeleton from '../../components/ui/skeletons/PageSkeleton'
import Sidebar from '../../components/layout/sidebar/Sidebar'
import Navbar from '../../components/layout/navbar/Navbar'
import Footer from '../../components/layout/footer/Footer'
import Hero from '../../components/layout/hero/Hero'
import PremiumStatsSection from '../../components/sections/PremiumStatsSection'
import PremiumTable from '../../components/ui/table/PremiumTable'
import { useDashboard } from '../../contexts/DashboardContext'

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'grid' },
  { id: 'plan', label: 'Plan de formation', icon: 'text' },
  { id: 'demandes', label: 'Demandes de formation', icon: 'inbox' },
  { id: 'catalogue', label: 'Catalogue', icon: 'hexagon' },
  { id: 'settings', label: 'Paramètres', icon: 'gear' },
]

const statConfig = [
  { id: 'demandes', title: 'Demandes formulées', value: 64, small: 'Total cette année' },
  { id: 'analyse', title: 'En analyse', value: 15, small: "En attente d'évaluation" },
  { id: 'validees', title: 'Validées', value: 25, small: 'Par le comité' },
  { id: 'avalider', title: 'À valider', value: 24, small: 'Action requise' },
]

const HomeContent = () => {
  const { collapsed, setCollapsed, active, setActive, darkMode, setDarkMode, greenTheme, setGreenTheme } = useDashboard()
  const [stats, setStats] = useState(() =>
    statConfig.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}),
  )

  useEffect(() => {
    setActive('dashboard')
  }, [setActive])

  useEffect(() => {
    const timers = statConfig.map((stat) => {
      const duration = 600
      const frameRate = 30
      const steps = duration / frameRate
      const increment = stat.value / steps
      let current = 0
      return setInterval(() => {
        current += increment
        setStats((prev) => ({
          ...prev,
          [stat.id]: current >= stat.value ? stat.value : Math.round(current),
        }))
      }, frameRate)
    })

    const cleanup = setTimeout(() => timers.forEach((timer) => clearInterval(timer)), 700)
    return () => {
      timers.forEach((timer) => clearInterval(timer))
      clearTimeout(cleanup)
    }
  }, [])

  const classNames = useMemo(() => {
    let base = 'dashboard-page'
    if (darkMode) base += ' dark'
    if (greenTheme) base += ' green'
    return base
  }, [darkMode, greenTheme])

  const handleSidebarToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const handleNavItemClick = (item) => {
    setActive(item.id)
    const heroTitle = document.getElementById('heroTitle')
    if (heroTitle) heroTitle.textContent = item.id === 'dashboard' ? 'Bienvenue sur SIGEF' : item.label
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={classNames}>
      <div className="app" role="application">
        <Sidebar
          collapsed={collapsed}
          onToggle={handleSidebarToggle}
          navItems={navItems}
          active={active}
          onItemClick={handleNavItemClick}
        />

        <main className="main" id="main">
          <Navbar
            onToggleSidebar={handleSidebarToggle}
            onDarkModeToggle={() => setDarkMode((prev) => !prev)}
            onThemeToggle={() => setGreenTheme((prev) => !prev)}
          />

          <Hero />

          <div className="cards"></div>

          <PremiumStatsSection />

          <PremiumTable />

          <Footer />
        </main>
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <PageWrapper>
      <Suspense fallback={<PageSkeleton />}>
        <HomeContent />
      </Suspense>
    </PageWrapper>
  )
}

export default Home

