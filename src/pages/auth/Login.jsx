import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../../hooks/users/useLogin'
import PageWrapper from '../../components/animations/PageWrapper'
import './login.css'

const chips = ['Sûr et conforme', 'Rapidité & UX', 'Responsive']

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const LoginContent = () => {
  const navigate = useNavigate()
  const [theme, setTheme] = useState(getInitialTheme)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [formError, setFormError] = useState('')

  const { mutate, isPending, error, reset } = useLogin({
    onSuccess: () => {
      // Optionnel: gérer "remember me" ici si une stratégie différente de stockage est souhaitée
      navigate('/dashboard', { replace: true })
    },
  })

  const getServerError = () => {
    const msgs = error?.response?.data?.messages
    if (Array.isArray(msgs) && msgs.length) return msgs.join(' ')
    return error?.response?.data?.message ?? error?.message
  }

  const toggleLabel = useMemo(
    () => (theme === 'dark' ? 'Mode clair' : 'Mode sombre'),
    [theme],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    // Validation minimale côté client
    if (!email.trim()) {
      setFormError("L'email est requis")
      const el = document.getElementById('email')
      if (el) el.focus()
      return
    }
    if (!password) {
      setFormError('Le mot de passe est requis')
      const el = document.getElementById('password')
      if (el) el.focus()
      return
    }

    // Lancer la mutation de login
    reset()
    mutate({ email: email.trim(), password })
  }

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

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <input
                id="email"
                type="email"
                name="email"
                placeholder=" "
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                required
              />
              <label htmlFor="password">Mot de passe</label>
              <button
                type="button"
                className="visibility-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                disabled={isPending}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="form-meta">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isPending}
                />{' '}
                Se souvenir
              </label>
              <Link to="/auth/forgot-password" className="link" aria-disabled={isPending}>
                Mot de passe oublié ?
              </Link>
            </div>

            {(formError || error) && (
              <small className="form-error" role="alert" aria-live="assertive">
                {formError || getServerError() || 'Erreur de connexion'}
              </small>
            )}

            <button
              type="submit"
              className="cta"
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending ? 'Connexion…' : 'Connexion'}
            </button>

            <div className="card-actions">
              <button type="button" className="subtle">
                Aide
              </button>
              <Link to="/auth/register" className="subtle" aria-disabled={isPending}>
                S’inscrire
              </Link>
            </div>
          </form>

          <p className="footer-note">Copyright © 2025 DGMP - SIGEF</p>
        </section>
      </main>
    </div>
  )
}

const Login = () => {
  // Simplify: render without PageWrapper to avoid animation layout issues on auth pages
  return <LoginContent />
}

export default Login

