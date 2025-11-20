const NavIcon = ({ icon, title, onClick, ariaLabel }) => {
  return (
    <button
      type="button"
      className="btn"
      title={title}
      onClick={onClick}
      aria-label={ariaLabel || title}
    >
      {icon}
    </button>
  )
}

export default NavIcon

