import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { getTopMatches } from '../utils/matchingAlgorithm'
import TrailCard from '../components/TrailCard'

const Results = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [matchedTrails, setMatchedTrails] = useState([])
  const [quizAnswers, setQuizAnswers] = useState(null)

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    // grab quiz answers from localStorage
    const savedAnswers = localStorage.getItem('quizAnswers')
    
    if (!savedAnswers) {
      // no quiz taken yet - redirect to quiz
      navigate('/quiz')
      return
    }

    const answers = JSON.parse(savedAnswers)
    setQuizAnswers(answers)

    try {
      // fetch all trails from Supabase
      const { data: trails, error } = await supabase
        .from('trails')
        .select('*')

      if (error) throw error

      // calculate matches and get top 5
      const matches = getTopMatches(trails, answers, 5)
      setMatchedTrails(matches)
    } catch (error) {
      console.error('Error loading trails:', error)
      alert('Error loading trail data. Please check your Supabase connection.')
    } finally {
      setLoading(false)
    }
  }

  const retakeQuiz = () => {
    localStorage.removeItem('quizAnswers')
    navigate('/quiz')
  }

  if (loading) {
    return (
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Finding your perfect trails...</h2>
        <p>Analyzing 20+ High Tatras trails</p>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-3">
          <div style={{ 
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            borderRadius: '20px',
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Your Perfect Matches
          </div>
          
          <h1>Top 5 Trails For You</h1>
          <p>Based on your preferences, here are the best High Tatras trails matched to your profile</p>
          
          <button 
            onClick={retakeQuiz}
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
          >
            Retake Quiz
          </button>
        </div>

        {/* Results */}
        {matchedTrails.length > 0 ? (
          <div className="grid grid-2" style={{ marginTop: '3rem' }}>
            {matchedTrails.map((trail, index) => (
              <div key={trail.id}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--primary)'
                  }}>
                    #{index + 1}
                  </span>
                  <span style={{ color: 'var(--text-gray)' }}>
                    {index === 0 && 'Best Match'}
                    {index === 1 && 'Great Option'}
                    {index === 2 && 'Also Recommended'}
                  </span>
                </div>
                <TrailCard trail={trail} showMatch={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No trails found</h2>
            <p>Try adjusting your preferences</p>
            <button onClick={retakeQuiz} className="btn btn-primary">
              Retake Quiz
            </button>
          </div>
        )}

        {/* Info section */}
        <div style={{ 
          marginTop: '4rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(26, 88, 64, 0.1), rgba(16, 185, 129, 0.1))',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h3>Want to explore more trails?</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Save your favorite trails to "My Plan" and browse all trails by retaking the quiz with different preferences
          </p>
          <Link to="/my-plan" className="btn btn-primary">
            View My Saved Trails
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Results
