import { Outlet } from 'react-router-dom'
import { useDashboard } from '../contexts/DashboardContext'

const DashboardLayout = () => {
  // Le layout est maintenant minimal, les composants Sidebar/Navbar sont dans chaque page
  // pour permettre les transitions fluides
  return <Outlet />
}

export default DashboardLayout
