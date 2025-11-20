import { useMemo, useState } from 'react'
import PageWrapper from '../../components/animations/PageWrapper'
import './login.css'

const chips = ['Sûr et conforme', 'Rapidité & UX', 'Responsive']

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const LoginContent = () => {
  console.log('LoginContent rendering') // Debug
  const [theme, setTheme] = useState(getInitialTheme)
  const [showPassword, setShowPassword] = useState(false)
  const toggleLabel = useMemo(
    () => (theme === 'dark' ? 'Mode clair' : 'Mode sombre'),
    [theme],
  )

  return (
    <div className="page" data-theme={theme}>
      <div className="bg-glow glow-one" />
      <div className="bg-glow glow-two" />

      <header className="top-bar">
        <span className="system-pill">DGMP — SIGEF</span>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-pressed={theme === 'light'}
        >
          {toggleLabel}
        </button>
      </header>

      <main className="grid">
        <section className="hero-copy">
          <div className="logo-stack">
            <div className="logo-square">
              <span>SIGEF</span>
            </div>
            <div>
              <p className="hero-eyebrow">DGMP — SIGEF</p>
              <p className="hero-eyebrow secondary">Plateforme de gestion de formation</p>
            </div>
          </div>

          <h1>Accédez à votre espace SIGEF</h1>
          <p className="hero-lead">
            Interface sécurisée — design moderne. Connexion via email ou compte institutionnel.
          </p>
          <p className="hero-lead">Pour des admins, activez l’authentification à deux facteurs.</p>

          <div className="chip-row">
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </section>

        <section className="auth-card">
          <div className="avatar-circle">
            <span className="avatar-icon" aria-hidden="true" />
          </div>

          <div className="card-headline">
            <h2>Connexion</h2>
            <p>Entrez vos identifiants pour continuer</p>
          </div>

          <form className="form">
            <div className="field">
              <input
                id="email"
                type="email"
                name="email"
                placeholder=" "
                autoComplete="email"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="field">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder=" "
                autoComplete="current-password"
              />
              <label htmlFor="password">Mot de passe</label>
              <button
                type="button"
                className="visibility-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="form-meta">
              <label className="remember">
                <input type="checkbox" defaultChecked /> Se souvenir
              </label>
              <button type="button" className="link">
                Mot de passe oublié ?
              </button>
            </div>

            <button type="submit" className="cta">
              Connexion
            </button>

            <div className="card-actions">
              <button type="button" className="subtle">
                Aide
              </button>
              <button type="button" className="subtle">
                S’inscrire
              </button>
            </div>
          </form>

          <p className="footer-note">Copyright © 2025 DGMP - SIGEF</p>
        </section>
      </main>
    </div>
  )
}

const Login = () => {
  console.log('Login component rendering') // Debug
  return (
    <PageWrapper>
      <LoginContent />
    </PageWrapper>
  )
}

export default Login

