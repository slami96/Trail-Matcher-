import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const TrailCard = ({ trail, showMatch = false, onRemove = null }) => {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const savedTrails = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    setIsSaved(savedTrails.some(t => t.id === trail.id))
  }, [trail.id])

  const handleSaveToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const savedTrails = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    
    if (isSaved) {
      const updated = savedTrails.filter(t => t.id !== trail.id)
      localStorage.setItem('savedTrails', JSON.stringify(updated))
      setIsSaved(false)
      if (onRemove) onRemove(trail.id)
    } else {
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
    <div className="card" style={{ position: 'relative', cursor: 'pointer' }}>
      <Link 
        to={`/trail/${trail.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {/* Trail image - now using real photos */}
        <div style={{ position: 'relative' }}>
          <img 
            src={`/images/trails/trail-${trail.id}.jpg`}
            alt={trail.name}
            style={{
              width: '100%',
              height: '200px',
              borderRadius: '12px',
              objectFit: 'cover',
              marginBottom: '1rem'
            }}
            loading="lazy"
          />
          
          {/* Match badge - positioned on top of image */}
          {showMatch && trail.match && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '1rem',
              color: 'var(--primary)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              ✨ {trail.match.score}% Match
            </div>
          )}
        </div>

        {/* Trail info */}
        <div>
          <h3 style={{ marginBottom: '0.75rem' }}>{trail.name}</h3>
          
          <div className="trail-stats" style={{ marginBottom: '1rem' }}>
            <span className="stat-item">📏 {trail.distance_km} km</span>
            <span className="stat-item">⏱️ {trail.duration_hours}h</span>
            <span className="stat-item">📈 {trail.elevation_gain_m}m ↑</span>
          </div>

          <span 
            className="badge" 
            style={{ 
              backgroundColor: getDifficultyColor(trail.difficulty),
              display: 'inline-block',
              marginBottom: '1rem'
            }}
          >
            {trail.difficulty}
          </span>

          {/* Match reasons */}
          {showMatch && trail.match && trail.match.reasons.length > 0 && (
            <div style={{ 
              fontSize: '0.9rem', 
              color: 'var(--text-gray)',
              marginBottom: '1rem',
              lineHeight: '1.6'
            }}>
              {trail.match.reasons.map((reason, idx) => (
                <div key={idx} style={{ marginBottom: '0.25rem' }}>
                  ✓ {reason}
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Save button - outside Link to prevent nesting */}
      <button
        onClick={handleSaveToggle}
        className={isSaved ? 'btn btn-accent btn-full' : 'btn btn-secondary btn-full'}
      >
        {isSaved ? '❤️ Saved' : '🤍 Save to My Plan'}
      </button>
    </div>
  )
}

export default TrailCard
