import { useNavigate } from 'react-router-dom'

const SidebarItem = ({ item, active, onClick }) => {
  const navigate = useNavigate()

  const getIcon = (iconName) => {
    const icons = {
      grid: <span>▦</span>,
      text: <span>≡</span>,
      inbox: <span>⌂</span>,
      hexagon: <span>⬡</span>,
      gear: <span>⚙</span>,
    }
    return icons[iconName] || null
  }

  const handleClick = () => {
    // Navigation basée sur l'ID de l'item
    const routeMap = {
      dashboard: '/dashboard',
      plan: '/plans-formation',
      demandes: '/demandes-formation',
      catalogue: '/formations',
      settings: '/dashboard/settings',
    }

    if (routeMap[item.id]) {
      navigate(routeMap[item.id])
    }

    if (onClick) {
      onClick(item)
    }
  }

  return (
    <button
      type="button"
      className={`nav-item ${active === item.id ? 'active' : ''}`}
      onClick={handleClick}
    >
      <span className="icon" aria-hidden="true">
        {getIcon(item.icon)}
      </span>
      <span className="nav-label">{item.label}</span>
    </button>
  )
}

export default SidebarItem
