import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import NavIcon from './NavIcon'

const Navbar = ({ onToggleSidebar, onDarkModeToggle, onThemeToggle }) => {
  return (
    <div className="topbar">
      <div className="top-left">
        <NavIcon
          icon="☰"
          title="Toggle sidebar"
          onClick={onToggleSidebar}
          ariaLabel="Toggle sidebar"
        />
        <SearchBar />
      </div>

      <div className="user-actions">
        <NavIcon icon="🌙" title="Mode sombre" onClick={onDarkModeToggle} />
        <NavIcon icon="🎨" title="Palette de couleurs" onClick={onThemeToggle} />
        <NavIcon icon="🔔" title="Notifications" />
        <NavIcon icon="❓" title="Aide" />
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar

