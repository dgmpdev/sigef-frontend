import { useState, useEffect } from 'react'
import PremiumKPICard from '../ui/cards/PremiumKPICard'
import ChartCard from '../ui/charts/ChartCard'
import DoughnutChart from '../ui/charts/DoughnutChart'
import LineChart from '../ui/charts/LineChart'
import ComboChart from '../ui/charts/ComboChart'

const PremiumStatsSection = () => {
  const [totalFormes, setTotalFormes] = useState(0)
  const [objectifAnnuel, setObjectifAnnuel] = useState(0)
  const [tauxRealisation, setTauxRealisation] = useState(0)

  useEffect(() => {
    // Animation count-up pour les KPI
    const animateValue = (setter, target, duration = 600) => {
      const steps = 30
      const increment = target / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setter(Math.round(current))
      }, duration / steps)
      return timer
    }

    const timers = [
      animateValue(setTotalFormes, 2407),
      animateValue(setObjectifAnnuel, 2000),
      animateValue(setTauxRealisation, 120.3, 800),
    ]

    return () => timers.forEach((timer) => clearInterval(timer))
  }, [])

  return (
    <section id="statsSection" style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '10px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--dgmp-gray-900)', marginBottom: '8px' }}>
        Statistiques Premium — SIGOMAP & Procédures
      </h2>

      {/* Premium KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px' }}>
        <PremiumKPICard
          title="Total acteurs formés"
          value={totalFormes.toLocaleString('fr-FR')}
          subtitle="Femmes : 733 — Hommes : 1 674"
        />
        <PremiumKPICard
          title="Objectif annuel"
          value={objectifAnnuel.toLocaleString('fr-FR')}
          subtitle="Objectif fixé par la DGMP"
        />
        <PremiumKPICard
          title="Taux global de réalisation"
          value={tauxRealisation.toFixed(1).replace('.', ',') + '%'}
          subtitle="Performance supérieure à l'objectif"
          valueColor="var(--dgmp-orange)"
        />
      </div>

      {/* Graphiques Premium */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))', gap: '26px', marginTop: '10px' }}>
        <ChartCard title="Répartition Femmes / Hommes" className="card">
          <DoughnutChart femmes={733} hommes={1674} />
        </ChartCard>

        <ChartCard title="Évolution mensuelle" className="card">
          <LineChart />
        </ChartCard>

        <ChartCard title="Objectifs vs Réalisations" className="card">
          <ComboChart />
        </ChartCard>
      </div>
    </section>
  )
}

export default PremiumStatsSection

