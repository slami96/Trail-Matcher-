import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <main className="welcome-container">
      <div className="welcome-content">
        {/* Large Logo Section */}
        <div className="welcome-logo-section">
          <img 
            src="/images/logo.png" 
            alt="Trail Matcher Logo"
            className="welcome-logo"
          />
          <h1 className="welcome-title">TRAIL MATCHER</h1>
        </div>

        {/* Main Heading */}
        <h2 className="welcome-heading">Find Your Perfect Trail</h2>
        
        {/* Subtitle */}
        <p className="welcome-subtitle">
          Personalized High Tatras hiking recommendations
        </p>

        {/* CTA Button */}
        <Link to="/quiz" className="btn btn-cta">
          START QUIZ
        </Link>

        {/* Simple 3-step explanation */}
        <div className="welcome-steps">
          <span>Take Quiz → Get Matches → Save Trails</span>
        </div>
      </div>
    </main>
  )
}

export default Welcome
