import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'

const Sidebar = ({ collapsed, onToggle, navItems, active, onItemClick }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Navigation">
      <SidebarLogo collapsed={collapsed} onToggle={onToggle} />
      
      <nav className="nav" aria-label="Menu principal">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            active={active}
            onClick={() => onItemClick(item)}
          />
        ))}
      </nav>

      <SidebarFooter />
    </aside>
  )
}

export default Sidebar

