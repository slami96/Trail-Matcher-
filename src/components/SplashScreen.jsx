import { useEffect, useState } from 'react'

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // After 2.3 seconds (0.8s fade in + 1.5s hold), start fade out
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2300)

    // After 3 seconds total, call onComplete
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
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
      <img 
        src="/images/logo.png" 
        alt="Trail Matcher Logo"
        className="splash-logo"
      />
    </div>
  )
}

export default SplashScreen
