import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext.jsx'

const useThemeMode = () => useContext(ThemeContext)

export default useThemeMode

