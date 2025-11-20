const SidebarLogo = ({ collapsed, onToggle }) => {
  return (
    <div className="brand" title="SIGEF">
      <div className="logo">S</div>
      <div style={{ lineHeight: 1 }}>
        <div className="title">SIGEF</div>
        <div className="subtitle">DGMP — Formations</div>
      </div>
      <button
        type="button"
        aria-pressed={collapsed}
        onClick={onToggle}
        className="ghost-icon"
      >
        <span aria-hidden="true">⟷</span>
      </button>
    </div>
  )
}

export default SidebarLogo

