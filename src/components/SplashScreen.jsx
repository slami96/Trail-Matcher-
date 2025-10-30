import { useEffect, useState } from 'react'

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const [showText1, setShowText1] = useState(false)
  const [showText2, setShowText2] = useState(false)
  const [showText3, setShowText3] = useState(false)

  useEffect(() => {
    // Show first text after logo fades in
    const text1Timer = setTimeout(() => setShowText1(true), 800)
    
    // Show second text
    const text2Timer = setTimeout(() => setShowText2(true), 1500)
    
    // Show third text
    const text3Timer = setTimeout(() => setShowText3(true), 2200)
    
    // Start fade out
    const fadeOutTimer = setTimeout(() => setFadeOut(true), 2700)

    // Complete and unmount
    const completeTimer = setTimeout(() => onComplete(), 3400)

    return () => {
      clearTimeout(text1Timer)
      clearTimeout(text2Timer)
      clearTimeout(text3Timer)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div 
      className="splash-screen"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s ease-out'
      }}
    >
      <div className="splash-content">
        <img 
          src="/images/logo.png" 
          alt="Trail Matcher Logo"
          className="splash-logo"
        />
        
        <div className="splash-text-container">
          <span 
            className="splash-text"
            style={{
              opacity: showText1 ? 1 : 0,
              transition: 'opacity 0.6s ease-in'
            }}
          >
            Choose Your Preference
          </span>
          
          <span 
            className="splash-text"
            style={{
              opacity: showText2 ? 1 : 0,
              transition: 'opacity 0.6s ease-in'
            }}
          >
            Pick Your Hike
          </span>
          
          <span 
            className="splash-text"
            style={{
              opacity: showText3 ? 1 : 0,
              transition: 'opacity 0.6s ease-in'
            }}
          >
            Save Your Journey
          </span>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
