import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import NavIcon from './NavIcon'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import PaletteIcon from '@mui/icons-material/Palette'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

const Navbar = ({ onToggleSidebar, onDarkModeToggle, onThemeToggle }) => {
  return (
    <div className="topbar">
      <div className="top-left">
        <NavIcon
          icon={<MenuIcon fontSize="small" style={{ color: 'var(--dgmp-gray-700, #374151)' }} />}
          title="Toggle sidebar"
          onClick={onToggleSidebar}
          ariaLabel="Toggle sidebar"
        />
        
      </div>

      <div className="user-actions">
        <NavIcon
          icon={
            <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--dgmp-gray-100, #f3f4f6)', display: 'grid', placeItems: 'center' }}>
              <DarkModeIcon fontSize="small" style={{ color: 'var(--dgmp-gray-700, #374151)' }} />
            </span>
          }
          title="Mode sombre"
          onClick={onDarkModeToggle}
        />
        <NavIcon icon={<PaletteIcon fontSize="small" style={{ color: 'var(--dgmp-orange, #ff8c00)' }} />} title="Palette de couleurs" onClick={onThemeToggle} />
        <NavIcon
          icon={
            <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--dgmp-gray-100, #f3f4f6)', display: 'grid', placeItems: 'center' }}>
              <NotificationsNoneIcon fontSize="small" style={{ color: 'var(--dgmp-gray-700, #374151)' }} />
            </span>
          }
          title="Notifications"
        />
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar

