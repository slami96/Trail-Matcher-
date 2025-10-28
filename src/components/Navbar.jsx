import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          <span style={{ fontSize: '1.5rem' }}>🏔️</span>
          <span>High Tatras</span>
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/quiz" 
              className={location.pathname === '/quiz' ? 'active' : ''}
            >
              Quiz
            </Link>
          </li>
          <li>
            <Link 
              to="/my-plan" 
              className={location.pathname === '/my-plan' ? 'active' : ''}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
