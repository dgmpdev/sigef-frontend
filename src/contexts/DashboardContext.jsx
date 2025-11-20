import React, { createContext, useContext, useState } from 'react'

const DashboardContext = createContext()

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return context
}

export const DashboardProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)
  const [greenTheme, setGreenTheme] = useState(false)

  return (
    <DashboardContext.Provider
      value={{
        collapsed,
        setCollapsed,
        active,
        setActive,
        darkMode,
        setDarkMode,
        greenTheme,
        setGreenTheme,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

