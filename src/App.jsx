import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import SplashScreen from './components/SplashScreen.jsx'
import BottomNav from './components/BottomNav.jsx'
import Welcome from './pages/Welcome.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import TrailDetail from './pages/TrailDetail.jsx'
import MyPlan from './pages/MyPlan.jsx'

function AppContent() {
  const location = useLocation()
  const hideNav = location.pathname === '/quiz'

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/trail/:id" element={<TrailDetail />} />
        <Route path="/my-plan" element={<MyPlan />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)


  useEffect(() => {
    const splashShown = sessionStorage.getItem('splashShown')
    if (splashShown) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    sessionStorage.setItem('splashShown', 'true')
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
