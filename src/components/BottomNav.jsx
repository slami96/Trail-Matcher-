import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()

  return (
    <nav className="bottom-nav">
      <Link 
        to="/" 
        className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        Home
      </Link>
      <Link 
        to="/my-plan" 
        className={`bottom-nav-item ${location.pathname === '/my-plan' ? 'active' : ''}`}
      >
        My Plan
      </Link>
    </nav>
  )
}

export default BottomNav
