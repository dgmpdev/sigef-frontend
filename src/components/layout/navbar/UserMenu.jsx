const UserMenu = ({ userName = 'KONE Adama', userRole = "Chargé(e) d'études" }) => {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="user-profile">
      <div className="avatar" title={userName}>
        {initials}
      </div>
      <div>
        <div className="name">{userName}</div>
        <div className="role">{userRole}</div>
      </div>
    </div>
  )
}

export default UserMenu

