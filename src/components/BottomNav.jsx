import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      <Link 
        to="/" 
        className={`bottom-nav-circle ${location.pathname === '/' ? 'active' : ''}`}
      >
        <span className="nav-label">Home</span>
      </Link>
      <Link 
        to="/my-plan" 
        className={`bottom-nav-circle ${location.pathname === '/my-plan' ? 'active' : ''}`}
      >
        <span className="nav-label">My Plan</span>
      </Link>
    </nav>
  )
}

export default BottomNav
