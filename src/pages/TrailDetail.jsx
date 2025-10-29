import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

const TrailDetail = () => {
  const { id } = useParams()
  const [trail, setTrail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    loadTrail()
    checkIfSaved()
  }, [id])

  const loadTrail = async () => {
    try {
      const { data, error } = await supabase
        .from('trails')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setTrail(data)
    } catch (error) {
      console.error('Error loading trail:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = () => {
    const savedTrails = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    setIsSaved(savedTrails.some(t => t.id === parseInt(id)))
  }

  const handleSaveToggle = () => {
    const savedTrails = JSON.parse(localStorage.getItem('savedTrails') || '[]')
    
    if (isSaved) {
      const updated = savedTrails.filter(t => t.id !== trail.id)
      localStorage.setItem('savedTrails', JSON.stringify(updated))
      setIsSaved(false)
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

  if (loading) {
    return (
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Loading trail...</h2>
      </main>
    )
  }

  if (!trail) {
    return (
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Trail not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Go Home
        </Link>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link to="/results" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
          Back to Results
        </Link>

        {/* Hero image */}
        <img 
          src={`/images/trails/trail-${trail.id}.jpg`}
          alt={trail.name}
          style={{
            width: '100%',
            height: '400px',
            borderRadius: '16px',
            objectFit: 'cover',
            marginBottom: '2rem'
          }}
          loading="lazy"
        />

        {/* Trail header */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="flex-between" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ marginBottom: '0.5rem' }}>{trail.name}</h1>
              <span 
                className="badge" 
                style={{ 
                  backgroundColor: getDifficultyColor(trail.difficulty),
                  fontSize: '1rem'
                }}
              >
                {trail.difficulty}
              </span>
            </div>
            
            <button
              onClick={handleSaveToggle}
              className={isSaved ? 'btn btn-accent' : 'btn btn-secondary'}
            >
              {isSaved ? 'Saved to My Plan' : 'Save to My Plan'}
            </button>
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{trail.description}</p>
        </div>

        {/* Trail stats */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Trail Stats</h3>
          
          <div className="grid grid-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                  {trail.distance_km} km
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  Distance
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                  {trail.duration_hours} hours
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  Duration
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                  {trail.elevation_gain_m} m
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  Elevation Gain
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                  {trail.best_season}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  Best Season
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>What You'll See</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {trail.features.map(feature => (
              <span key={feature} className="badge-gray badge">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Highlights</h3>
          <p style={{ lineHeight: '1.7' }}>{trail.highlights}</p>
        </div>

        {/* Suitable for */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Suitable For</h3>
          <p style={{ lineHeight: '1.7' }}>{trail.suitable_for}</p>
        </div>

        {/* CTA */}
        <div style={{ 
          marginTop: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Hike This Trail?</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
            Save it to your plan and discover more amazing trails
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quiz" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
              Find More Trails
            </Link>
            <Link to="/my-plan" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
              View My Plan
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TrailDetail
