import { useEffect, useState } from 'react'
import './home.css'
import PageWrapper from '../../components/animations/PageWrapper'
import Hero from '../../components/layout/hero/Hero'
import PremiumStatsSection from '../../components/sections/PremiumStatsSection'
import PremiumTable from '../../components/ui/table/PremiumTable'
import { useDashboard } from '../../contexts/DashboardContext'

const statConfig = [
  { id: 'demandes', title: 'Demandes formulées', value: 64, small: 'Total cette année' },
  { id: 'analyse', title: 'En analyse', value: 15, small: "En attente d'évaluation" },
  { id: 'validees', title: 'Validées', value: 25, small: 'Par le comité' },
  { id: 'avalider', title: 'À valider', value: 24, small: 'Action requise' },
]

const HomeContent = () => {
  const { setActive } = useDashboard()
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

  return (
    <>
      <Hero />
      <div className="cards"></div>
      <PremiumStatsSection stats={stats} />
      <PremiumTable />
    </>
  )
}

const Home = () => {
  return (
    <PageWrapper>
      <HomeContent />
    </PageWrapper>
  )
}

export default Home

