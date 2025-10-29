import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TrailCard from '../components/TrailCard'

const MyPlan = () => {
  const [savedTrails, setSavedTrails] = useState([])

  useEffect(() => {
    loadSavedTrails()
  }, [])

  const loadSavedTrails = () => {
    const saved = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    setSavedTrails(saved)
  }

  const handleRemove = (trailId) => {
    const updated = savedTrails.filter(t => t.id !== trailId)
    setSavedTrails(updated)
    localStorage.setItem('savedTrails', JSON.stringify(updated))
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved trails?')) {
      localStorage.setItem('savedTrails', '[]')
      setSavedTrails([])
    }
  }

  const getTotalStats = () => {
    if (savedTrails.length === 0) return null

    const totalDistance = savedTrails.reduce((sum, t) => sum + t.distance_km, 0)
    const totalTime = savedTrails.reduce((sum, t) => sum + t.duration_hours, 0)
    const totalElevation = savedTrails.reduce((sum, t) => sum + t.elevation_gain_m, 0)

    return { totalDistance, totalTime, totalElevation }
  }

  const stats = getTotalStats()

  return (
    <main style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>My Hiking Plan</h1>
            <p>
              {savedTrails.length === 0 
                ? 'No trails saved yet' 
                : `${savedTrails.length} trail${savedTrails.length > 1 ? 's' : ''} saved`
              }
            </p>
          </div>
          
          {savedTrails.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/quiz" className="btn btn-primary">
                Find More Trails
              </Link>
              <button 
                onClick={clearAll}
                className="btn btn-secondary"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Total stats */}
        {stats && (
          <div className="card" style={{ 
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, rgba(26, 88, 64, 0.1), rgba(16, 185, 129, 0.1))',
            border: '2px solid var(--primary)'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Your Total Adventure Stats</h3>
            
            <div className="grid grid-3">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--primary)'
                }}>
                  {stats.totalDistance.toFixed(1)} km
                </div>
                <div style={{ color: 'var(--text-gray)' }}>Total Distance</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--primary)'
                }}>
                  {stats.totalTime.toFixed(1)} hrs
                </div>
                <div style={{ color: 'var(--text-gray)' }}>Total Time</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'var(--primary)'
                }}>
                  {stats.totalElevation.toLocaleString()} m
                </div>
                <div style={{ color: 'var(--text-gray)' }}>Total Elevation</div>
              </div>
            </div>
          </div>
        )}

        {/* Saved trails */}
        {savedTrails.length > 0 ? (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Your Saved Trails</h2>
            <div className="grid grid-2">
              {savedTrails.map(trail => (
                <TrailCard 
                  key={trail.id} 
                  trail={trail} 
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h2>No Trails Saved Yet</h2>
            <p>Take the quiz to find trails that match your preferences and save your favorites here!</p>
            <Link to="/quiz" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Start Quiz
            </Link>
          </div>
        )}

        {/* Tips section */}
        {savedTrails.length > 0 && (
          <div style={{ 
            marginTop: '4rem',
            padding: '2rem',
            backgroundColor: 'var(--bg-white)',
            borderRadius: '16px',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Planning Tips</h3>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <li>✓ Check weather forecast before heading out</li>
              <li>✓ Bring plenty of water (at least 2L per person)</li>
              <li>✓ Start early to avoid afternoon storms</li>
              <li>✓ Let someone know your hiking plans</li>
              <li>✓ Pack extra layers - mountain weather changes quickly</li>
              <li>✓ Download offline maps before you go</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}

export default MyPlan
