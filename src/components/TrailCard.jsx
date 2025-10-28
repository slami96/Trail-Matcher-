import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const TrailCard = ({ trail, showMatch = false, onRemove = null }) => {
  const [isSaved, setIsSaved] = useState(false)

  // check if trail is already saved when component loads
  useEffect(() => {
    const savedTrails = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    setIsSaved(savedTrails.some(t => t.id === trail.id))
  }, [trail.id])

  const handleSaveToggle = (e) => {
    e.preventDefault()
    const savedTrails = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    
    if (isSaved) {
      // remove from saved
      const updated = savedTrails.filter(t => t.id !== trail.id)
      localStorage.setItem('savedTrails', JSON.stringify(updated))
      setIsSaved(false)
      if (onRemove) onRemove(trail.id)
    } else {
      // add to saved
      savedTrails.push(trail)
      localStorage.setItem('savedTrails', JSON.stringify(savedTrails))
      setIsSaved(true)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Moderate': return '#f59e0b'
      case 'Hard': return '#ef4444'
      case 'Very Hard': return '#7c3aed'
      default: return '#6b7280'
    }
  }

  return (
    <Link to={`/trail/${trail.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Trail image or placeholder */}
      <div 
        className="trail-placeholder"
        style={{
          background: `linear-gradient(135deg, ${getDifficultyColor(trail.difficulty)}, var(--secondary))`
        }}
      >
        🏔️
      </div>

      {/* Match percentage badge if showing matches */}
      {showMatch && trail.match && (
        <div className="match-badge mb-1">
          ✨ {trail.match.score}% Match
        </div>
      )}

      <h3>{trail.name}</h3>
      
      <div className="trail-stats">
        <span className="stat-item">
          📏 {trail.distance_km} km
        </span>
        <span className="stat-item">
          ⏱️ {trail.duration_hours}h
        </span>
        <span className="stat-item">
          📈 {trail.elevation_gain_m}m ↑
        </span>
      </div>

      <span 
        className="badge" 
        style={{ backgroundColor: getDifficultyColor(trail.difficulty) }}
      >
        {trail.difficulty}
      </span>

      {/* Show match reasons if available */}
      {showMatch && trail.match && trail.match.reasons.length > 0 && (
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
          {trail.match.reasons.map((reason, idx) => (
            <div key={idx}>✓ {reason}</div>
          ))}
        </div>
      )}

      {/* Save button */}
      <button
        onClick={handleSaveToggle}
        className={isSaved ? 'btn btn-accent btn-full mt-2' : 'btn btn-secondary btn-full mt-2'}
        style={{ marginTop: '1rem' }}
      >
        {isSaved ? '❤️ Saved' : '🤍 Save to My Plan'}
      </button>
    </Link>
  )
}

export default TrailCard
