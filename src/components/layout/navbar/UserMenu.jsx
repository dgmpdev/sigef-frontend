import { useEffect, useRef, useState, useMemo } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'

const UserMenu = ({
  userName = 'KONE Adama',
  userRole = "Chargé(e) d'études",
  onLogout,
  onProfile,
  onChangePassword,
  onChangeFunction,
}) => {
  const initials = useMemo(
    () =>
      userName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    [userName]
  )

  const [open, setOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return
      if (!menuRef.current || !triggerRef.current) return
      if (
        !menuRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setShowLogoutModal(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleItem = (key) => {
    if (key === 'logout') {
      setShowLogoutModal(true)
      return
    }
    const map = {
      profile: onProfile,
      pass: onChangePassword,
      'change-func': onChangeFunction,
    }
    map[key] && map[key]()
    setOpen(false)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    onLogout && onLogout()
    setOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Inline styles to keep changes minimal and scoped to this component */}
      <style>{`
        .um-user-trigger{display:flex;align-items:center;gap:12px;cursor:pointer;user-select:none}
        .um-user-name{color:var(--dgmp-orange, #ff8c00);font-weight:600}
        .um-avatar{width:36px;height:36px;border-radius:50%;background:#dde3e8;display:grid;place-items:center;color:#0f1720;font-weight:700}
        .um-dropdown{position:absolute;right:0;top:calc(100% + 12px);width:320px;background:#fff;border-radius:18px 18px 14px 14px;box-shadow:0 8px 20px rgba(15,23,32,0.06);opacity:0;pointer-events:none;transform:translateY(-14px) scale(.96);transition:opacity .28s ease, transform .32s cubic-bezier(.22,.8,.3,1);z-index:20}
        .um-dropdown.open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}
        .um-menu-list{list-style:none;margin:0;padding:0}
        .um-menu-item{display:flex;align-items:center;gap:14px;padding:14px 18px;cursor:pointer;transition:background .18s ease, transform .18s ease, box-shadow .18s ease;border-top:1px solid #f1f1f3;color:var(--dgmp-gray-700, #374151)}
        .um-menu-item:first-child{border-top:0}
        .um-menu-item:hover{background:linear-gradient(90deg, var(--dgmp-orange, #ff8c00), var(--dgmp-orange-600, #d97706));color:white;transform:scale(1.03);box-shadow:0 4px 12px rgba(255,140,0,0.25)}
        .um-icon{width:28px;height:28px;border-radius:8px;background:#f3f4f6;display:grid;place-items:center;flex:0 0 28px;transition:transform .18s ease, background .18s ease}
        .um-menu-item:hover .um-icon{background:rgba(255,255,255,0.25);transform:scale(1.12)}
        .um-label{font-size:15px}
        .um-logout{color:var(--dgmp-orange, #ff8c00);font-weight:700}
        .um-caret{position:absolute;right:12px;top:36px;width:18px;height:18px;background:linear-gradient(135deg, var(--dgmp-orange, #ff8c00), var(--dgmp-orange-600, #d97706));border-radius:6px;box-shadow:0 4px 8px rgba(0,0,0,0.18);transform:rotate(45deg) translateY(6px) scale(0.75);opacity:0;pointer-events:none;transition:opacity .28s ease, transform .32s cubic-bezier(.22,.8,.3,1);z-index:19}
        .um-caret.show{opacity:1;transform:rotate(45deg) translateY(0) scale(1)}
        .um-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.35);display:none;align-items:center;justify-content:center;z-index:100}
        .um-modal-backdrop.show{display:flex;animation:um-fadeIn .25s ease forwards}
        .um-modal{background:white;padding:20px;border-radius:10px;width:360px;box-shadow:0 10px 30px rgba(0,0,0,0.1);transform:scale(.95) translateY(10px);opacity:0;animation:um-modalPop .32s cubic-bezier(.22,.8,.3,1) forwards}
        .um-row{display:flex;gap:10px;justify-content:flex-end;margin-top:16px}
        .um-btn{padding:10px 14px;border-radius:8px;border:0;font-weight:600;cursor:pointer}
        .um-btn.ghost{background:#eee}
        .um-btn.warn{background:#ff8c00;color:white}
        @keyframes um-fadeIn{from{opacity:0}to{opacity:1}}\n        @keyframes um-modalPop{0%{transform:scale(.95) translateY(10px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}
      `}</style>

      <div
        ref={triggerRef}
        className="um-user-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="user-menu"
      >
        <div className="um-user-name">
          {userName} - <span style={{ color: '#6b6f74', fontWeight: 500 }}>{userRole}</span>
        </div>
        <div className="um-avatar" title={userName} aria-hidden>
          {initials}
        </div>
      </div>

      <div className={"um-caret" + (open ? ' show' : '')} />

      <nav
        ref={menuRef}
        id="user-menu"
        className={"um-dropdown" + (open ? ' open' : '')}
        role="menu"
      >
        <ul className="um-menu-list">
          <li className="um-menu-item" role="menuitem" tabIndex={0} onClick={() => handleItem('change-func')}>
            <div className="um-icon" aria-hidden>
              <SyncAltIcon style={{ fontSize: 18 }} />
            </div>
            <div className="um-label">Changement de fonction</div>
          </li>
          <li className="um-menu-item" role="menuitem" tabIndex={0} onClick={() => handleItem('pass')}>
            <div className="um-icon" aria-hidden>
              <LockIcon style={{ fontSize: 18 }} />
            </div>
            <div className="um-label">Changement de mot de passe</div>
          </li>
          <li className="um-menu-item" role="menuitem" tabIndex={0} onClick={() => handleItem('profile')}>
            <div className="um-icon" aria-hidden>
              <PersonIcon style={{ fontSize: 18 }} />
            </div>
            <div className="um-label">Profil</div>
          </li>
          <li className="um-menu-item um-logout" role="menuitem" tabIndex={0} onClick={() => handleItem('logout')}>
            <div className="um-icon" aria-hidden>
              <LogoutIcon style={{ fontSize: 18, color: 'var(--dgmp-orange, #ff8c00)' }} />
            </div>
            <div className="um-label">Déconnexion</div>
          </li>
        </ul>
      </nav>

      {/* Modal */}
      <div className={"um-modal-backdrop" + (showLogoutModal ? ' show' : '')} role="dialog" aria-modal="true" aria-labelledby="um-logout-title">
        <div className="um-modal">
          <h3 id="um-logout-title">Déconnexion</h3>
          <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
          <div className="um-row">
            <button className="um-btn ghost" onClick={() => setShowLogoutModal(false)}>Annuler</button>
            <button className="um-btn warn" onClick={confirmLogout}>Se déconnecter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMenu

