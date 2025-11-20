import React from 'react'
import PageWrapper from '../../components/animations/PageWrapper.jsx'
import Hero from '../../components/layout/hero/Hero.jsx'
import { useDashboard } from '../../contexts/DashboardContext.jsx'
import '../dashboard/home.css'

const PlanFormationContent = () => {
  const { setActive } = useDashboard()

  React.useEffect(() => {
    setActive('plan')
  }, [setActive])

  return (
    <>
      <Hero title="Plan de formation" subtitle="Gérez et consultez le plan annuel de formation" />

      <div className="cards">
        {/* Contenu à venir */}
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--dgmp-gray-400)' }}>
          <p>Contenu du plan de formation à venir...</p>
        </div>
      </div>
    </>
  )
}

const PlanFormation = () => {
  return (
    <PageWrapper>
      <PlanFormationContent />
    </PageWrapper>
  )
}

export default PlanFormation

