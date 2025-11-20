import { createContext } from 'react'

const ThemeContext = createContext({
  mode: 'dark',
  toggleMode: () => {},
})

export default ThemeContext

