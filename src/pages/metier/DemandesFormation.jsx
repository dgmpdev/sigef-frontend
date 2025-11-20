import React, { useEffect } from 'react'
import PageWrapper from '../../components/animations/PageWrapper.jsx'
import Hero from '../../components/layout/hero/Hero.jsx'
import { useDashboard } from '../../contexts/DashboardContext.jsx'
import '../dashboard/home.css'

const DemandesFormationContent = () => {
  const { setActive } = useDashboard()

  useEffect(() => {
    setActive('demandes')
  }, [setActive])

  return (
    <>
      <Hero title="Demandes de formation" subtitle="Créez, suivez et validez les demandes de formation" />

      <div className="cards">
        {/* Contenu à venir */}
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--dgmp-gray-400)' }}>
          <p>Contenu des demandes de formation à venir...</p>
        </div>
      </div>
    </>
  )
}

const DemandesFormation = () => {
  return (
    <PageWrapper>
      <DemandesFormationContent />
    </PageWrapper>
  )
}

export default DemandesFormation

