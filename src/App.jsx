import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Welcome from './pages/Welcome.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import TrailDetail from './pages/TrailDetail.jsx'
import MyPlan from './pages/MyPlan.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/trail/:id" element={<TrailDetail />} />
        <Route path="/my-plan" element={<MyPlan />} />
      </Routes>
    </Router>
  )
}

export default App
