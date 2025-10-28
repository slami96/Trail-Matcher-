import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          <img 
            src="/images/logo.png" 
            alt="High Tatras Trail Planner Logo"
            style={{ 
              height: '40px',
              width: 'auto'
            }}
          />
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
