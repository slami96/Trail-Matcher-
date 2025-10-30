import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <main className="welcome-container">
      <div className="welcome-content">
        {/* Large Logo - 20% bigger */}
        <div className="welcome-logo-section">
          <img 
            src="/images/logo.png" 
            alt="Trail Matcher Logo"
            className="welcome-logo"
          />
        </div>

        {/* Main Heading */}
        <h2 className="welcome-heading">Find Your Perfect Trail</h2>
        
        {/* Subtitle */}
        <p className="welcome-subtitle">
          Personalized High Tatras hiking recommendations
        </p>

        {/* CTA Button */}
        <Link to="/quiz" className="btn btn-cta">
          START NOW
        </Link>
      </div>
    </main>
  )
}

export default Welcome
