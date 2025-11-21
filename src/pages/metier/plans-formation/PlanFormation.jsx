import React from 'react'
import PageWrapper from '../../../components/animations/PageWrapper.jsx'
import Hero from '../../../components/layout/hero/Hero.jsx'
import { useDashboard } from '../../../contexts/DashboardContext.jsx'
import '../../dashboard/home.css'

const PlanFormationContent = () => {
  const { setActive } = useDashboard()
  const [search, setSearch] = React.useState('')
  const [openIndex, setOpenIndex] = React.useState(null)
  const buttonRef = React.useRef(null)

  React.useEffect(() => {
    setActive('plan')
  }, [setActive])

  // Close menus on click outside or on Escape
  React.useEffect(() => {
    const onDocClick = (e) => {
      const target = e.target
      // keep open if clicking on dots or inside a menu panel
      const isDots = target && target.closest && target.closest('.pf-dots')
      const inMenu = target && target.closest && target.closest('.pf-menu-panel')
      if (!isDots && !inMenu) setOpenIndex(null)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpenIndex(null) }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keyup', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keyup', onKey)
    }
  }, [])

  const handleRipple = (e) => {
    const btn = buttonRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.style.background = 'radial-gradient(circle, rgba(110,231,183,0.45) 0%, rgba(16,185,129,0.30) 40%, rgba(5,150,105,0.20) 70%, rgba(5,150,105,0) 100%)'
    ripple.style.borderRadius = '50%'
    ripple.style.pointerEvents = 'none'
    ripple.style.transform = 'scale(0)'
    ripple.style.opacity = '0.6'
    ripple.style.transition = 'transform 0.55s ease-out, opacity 0.55s ease-out'
    btn.appendChild(ripple)
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(3)'
      ripple.style.opacity = '0'
    })
    setTimeout(() => ripple.remove(), 600)
  }

  const rows = [
    { id: 1, libelle: 'Plan de formation 2026', badgeBg: '#e0ecff', badgeColor: '#2563eb', badgeText: '• En cours de validation' },
    { id: 2, libelle: 'Plan de formation 2025', badgeBg: '#d1fae5', badgeColor: '#059669', badgeText: '• Validé' },
    { id: 3, libelle: 'Plan de formation 2024', badgeBg: '#ffedd5', badgeColor: '#d97706', badgeText: '• Archivé' },
  ]

  return (
    <>
      <Hero title="Plan de formation" subtitle="Gérez et consultez le plan annuel de formation" />

      <div className="cards" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Search + Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12 }}>
          {/* Search bar */}
          <div className="pf-search search-animated" style={{ width: '30%', display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #e5e7eb', padding: '10px 14px', borderRadius: 30, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', transition: 'all .25s ease', position: 'relative', overflow: 'hidden' }}>
            <span className="search-ripple"></span>
            <span className="search-icon" style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>🔍</span>
            <input
              type="text"
              placeholder="Rechercher une formation, demande..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent' }}
            />
          </div>

          {/* New plan button */}
          <button
            ref={buttonRef}
            onClick={handleRipple}
            className="btn-primary-plan"
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg, #34d399, #10b981)', color: '#fff', padding: '10px 26px', height: 42, border: '2px solid #10b981', borderRadius: 30, cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.25s ease', fontSize: 14, boxShadow: '0 3px 8px rgba(16,185,129,0.20)', position: 'relative', overflow: 'hidden' }}
          >
            <span className="material-icons" style={{ fontSize: 20 }}>add</span>
            Nouveau plan
          </button>
        </div>

        {/* Table */}
        <div className="card" style={{ background: '#fff', borderRadius: 12, padding: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'visible' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#eef0f4', textAlign: 'left' }}>
                <th style={{ padding: '16px 12px', width: 60 }}>N°</th>
                <th style={{ padding: '16px 12px' }}>Libellé</th>
                <th style={{ padding: '16px 12px', width: 200 }}>Statut</th>
                <th style={{ padding: '16px 12px', textAlign: 'right', width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows
                .filter(r => r.libelle.toLowerCase().includes(search.toLowerCase()))
                .map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                    <td style={{ padding: '16px 12px' }}>{row.id}</td>
                    <td style={{ padding: '16px 12px' }}>{row.libelle}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ background: row.badgeBg, color: row.badgeColor, padding: '6px 14px', borderRadius: 20, fontSize: 13 }}>{row.badgeText}</span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right', position: 'relative' }}>
                      <div className="action-menu" style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <span
                          className="pf-dots"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenIndex(openIndex === idx ? null : idx)
                          }}
                          style={{ cursor: 'pointer', fontSize: 22 }}
                        >
                          ⋮
                        </span>
                        <div
                          className="pf-menu-panel"
                          style={{
                            display: openIndex === idx ? 'block' : 'none',
                            opacity: openIndex === idx ? 1 : 0,
                            transform: openIndex === idx ? 'translateX(50%) translateY(0)' : 'translateX(50%) translateY(-5px)',
                            transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.25s ease',
                            position: 'absolute', right: '50%', top: 32, background: '#fff',
                            border: '1px solid #e5e7eb', borderRadius: 6,
                            width: 140, zIndex: 20, textAlign: 'left',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                          }}
                        >
                          <div className="menu-item" style={{ padding: '10px 12px', cursor: 'pointer' }}>Modification</div>
                          <div className="menu-item" style={{ padding: '10px 12px', cursor: 'pointer' }}>Détails</div>
                          <div className="menu-item" style={{ padding: '10px 12px', cursor: 'pointer', color: '#b91c1c' }}>Suppression</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Local styles to mimic the original animations */}
      <style>{`
        .btn-primary-plan { background-size:200% 200%; animation:gradientMove 4s ease infinite; }
        @keyframes gradientMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .btn-primary-plan:hover { transform:scale(1.06); box-shadow:0 6px 16px rgba(16,185,129,0.35); }
        .btn-primary-plan:active { transform:scale(0.94); box-shadow:0 2px 6px rgba(16,185,129,0.25); }
        .btn-primary-plan:hover .material-icons { transform:rotate(20deg) scale(1.1); transition:transform 0.25s ease; }
        @media(max-width:600px){ .btn-primary-plan{ position:fixed; bottom:20px; right:20px; z-index:999; padding:14px 30px; } }
        .search-animated:hover { transform:scale(1.03); border-color:#ff8c00; box-shadow:0 4px 12px rgba(255,140,0,0.35); }
        .search-animated:focus-within { transform:scale(1.05); border-color:#ff8c00; box-shadow:0 6px 18px rgba(255,140,0,0.45); }
        .search-animated:hover .search-icon { transform:scale(1.18) rotate(8deg); transition:transform .25s ease; }
        .pf-search input::placeholder { opacity:0.8; }
      `}</style>
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

