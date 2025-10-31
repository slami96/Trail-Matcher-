import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()

  return (
    <nav 
      className="bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '1.5rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(226, 232, 240, 0.5)',
        zIndex: 100
      }}
    >
      <Link 
        to="/" 
        className={`bottom-nav-btn ${location.pathname === '/' ? 'active' : ''}`}
      >
        <span className="nav-label">Home</span>
      </Link>
      <Link 
        to="/my-plan" 
        className={`bottom-nav-btn ${location.pathname === '/my-plan' ? 'active' : ''}`}
      >
        <span className="nav-label">My Plan</span>
      </Link>
    </nav>
  )
}

export default BottomNav
