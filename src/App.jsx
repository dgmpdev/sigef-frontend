import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import ThemeContext from './contexts/ThemeContext.jsx'
import AppRouter from './router/AppRouter.jsx'

const App = () => {
  const [mode, setMode] = useState('dark')

  const colorController = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#f7931e' },
          secondary: { main: '#37c48f' },
          background: {
            default: mode === 'dark' ? '#0b1120' : '#f4f6fb',
            paper: mode === 'dark' ? '#101828' : '#ffffff',
          },
        },
        shape: {
          borderRadius: 16,
        },
        typography: {
          fontFamily: '"Inter", "Space Grotesk", system-ui, -apple-system, sans-serif',
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={colorController}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App
