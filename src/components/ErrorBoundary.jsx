import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render() {
    const { hasError, error } = this.state
    const { fallback = null, children } = this.props
    if (hasError) {
      if (fallback) return typeof fallback === 'function' ? fallback(error) : fallback
      return (
        <div role="alert" style={{ padding: 16 }}>
          <h3>Une erreur est survenue</h3>
          {import.meta.env.DEV ? (
            <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error)}</pre>
          ) : (
            <p>Veuillez réessayer plus tard.</p>
          )}
        </div>
      )
    }
    return children
  }
}

export default ErrorBoundary
