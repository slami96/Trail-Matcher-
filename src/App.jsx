import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Welcome from './pages/Welcome'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import TrailDetail from './pages/TrailDetail'
import MyPlan from './pages/MyPlan'

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
