import { useEffect, useMemo, useState } from 'react'
import './home.css'

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'grid' },
  { id: 'plan', label: 'Plan de formation', icon: 'text' },
  { id: 'demandes', label: 'Demandes de formation', icon: 'inbox' },
  { id: 'catalogue', label: 'Catalogue', icon: 'hexagon' },
  { id: 'settings', label: 'Paramètres', icon: 'gear' },
]

const statConfig = [
  { id: 'demandes', title: 'Demandes formulées', value: 64, small: 'Total cette année' },
  { id: 'analyse', title: 'En analyse', value: 15, small: 'En attente d’évaluation' },
  { id: 'validees', title: 'Validées', value: 25, small: 'Par le comité' },
  { id: 'avalider', title: 'À valider', value: 24, small: 'Action requise' },
]

const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)
  const [greenTheme, setGreenTheme] = useState(false)
  const [year, setYear] = useState('2025')
  const [stats, setStats] = useState(() =>
    statConfig.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}),
  )

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

  return (
    <div className={classNames}>
      <div className="app" role="application">
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Navigation">
          <div className="brand" title="SIGEF">
            <div className="logo">S</div>
            <div style={{ lineHeight: 1 }}>
              <div className="title">SIGEF</div>
              <div className="subtitle">DGMP — Formations</div>
            </div>
            <button
              type="button"
              aria-pressed={collapsed}
              onClick={() => setCollapsed((prev) => !prev)}
              className="ghost-icon"
            >
              <span aria-hidden="true">⟷</span>
            </button>
          </div>

          <nav className="nav" aria-label="Menu principal">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`nav-item ${active === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActive(item.id)
                  const heroTitle = document.getElementById('heroTitle')
                  if (heroTitle) heroTitle.textContent = item.id === 'dashboard' ? 'Bienvenue sur SIGEF' : item.label
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span className="icon" aria-hidden="true">
                  {item.icon === 'grid' && <span>▦</span>}
                  {item.icon === 'text' && <span>≡</span>}
                  {item.icon === 'inbox' && <span>⌂</span>}
                  {item.icon === 'hexagon' && <span>⬡</span>}
                  {item.icon === 'gear' && <span>⚙</span>}
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">© 2025 DGMP</div>
        </aside>

        <main className="main" id="main">
          <div className="topbar">
            <div className="top-left">
              <button
                type="button"
                className="btn"
                aria-label="Toggle sidebar"
                onClick={() => setCollapsed((prev) => !prev)}
              >
                ☰
              </button>
              <div className="search" role="search">
                <span aria-hidden="true">🔍</span>
                <input placeholder="Rechercher une formation, demande..." aria-label="Recherche" />
              </div>
            </div>

            <div className="user-actions">
              <button type="button" className="btn" title="Mode sombre" onClick={() => setDarkMode((prev) => !prev)}>
                🌙
              </button>
              <button
                type="button"
                className="btn"
                title="Palette de couleurs"
                onClick={() => setGreenTheme((prev) => !prev)}
              >
                🎨
              </button>
              <button type="button" className="btn" title="Notifications">
                🔔
              </button>
              <button type="button" className="btn" title="Aide">
                ❓
              </button>
              <div className="user-profile">
                <div className="avatar" title="KONE Adama">
                  KA
                </div>
                <div>
                  <div className="name">KONE Adama</div>
                  <div className="role">Chargé(e) d&apos;études</div>
                </div>
              </div>
            </div>
          </div>

          <section className="hero" aria-labelledby="heroTitle">
            <div className="hero-left">
              <div id="heroTitle" className="hero-title">
                Bienvenue sur SIGEF
              </div>
              <div className="hero-sub">Système Informatique de Gestion des Formations — DGMP</div>
            </div>
            <div className="hero-right">
              <div>Année</div>
              <select value={year} onChange={(event) => setYear(event.target.value)} aria-label="Sélection année">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </section>

          <div className="cards">
            <article className="card" aria-labelledby="c1">
              <div className="meta">
                <div className="badge orange">Plan</div>
                <div>
                  <h3 id="c1">Plan de formation</h3>
                  <p>Consultez et gérez le plan annuel.</p>
                </div>
              </div>
              <a className="cta" href="#">
                Accéder
              </a>
            </article>

            <article className="card" aria-labelledby="c2">
              <div className="meta">
                <div className="badge green">Demandes</div>
                <div>
                  <h3 id="c2">Demandes de formation</h3>
                  <p>Créer, suivre et valider les demandes.</p>
                </div>
              </div>
              <a className="cta green" href="#">
                Voir les demandes
              </a>
            </article>

            <article className="card" aria-labelledby="c3">
              <div className="meta">
                <div className="badge violet">Catalogue</div>
                <div>
                  <h3 id="c3">Formations</h3>
                  <p>Catalogue complet des formations disponibles.</p>
                </div>
              </div>
              <a className="cta" href="#">
                Explorer
              </a>
            </article>
          </div>

          <section aria-labelledby="statsTitle">
            <h2 id="statsTitle">Statistiques rapides</h2>
            <div className="stats-grid">
              {statConfig.map((stat) => (
                <div className="stat" key={stat.id} role="region" aria-label={stat.title}>
                  <div className="title">{stat.title}</div>
                  <div className="value">{stats[stat.id]}</div>
                  <div className="small">{stat.small}</div>
                </div>
              ))}
            </div>
          </section>

          <footer className="page-footer">Copyright © 2025 DGMP — SIGEF. Tous droits réservés.</footer>
        </main>
      </div>
    </div>
  )
}

export default Home

