import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <main>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏔️</div>
          <h1 style={{ color: 'white' }}>Find Your Perfect High Tatras Trail</h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Take our smart quiz and get personalized trail recommendations based on your fitness, preferences, and available time
          </p>
          <Link to="/quiz" className="btn btn-accent" style={{ fontSize: '1.1rem' }}>
            Start Quiz 🚀
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 1rem' }}>
        <div className="container">
          <h2 className="text-center mb-3">How It Works</h2>
          
          <div className="grid grid-3">
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3>Take the Quiz</h3>
              <p>Answer 6 simple questions about your fitness level, preferences, and what you want to see</p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h3>Get Smart Matches</h3>
              <p>Our algorithm analyzes 20+ trails and finds the perfect matches with detailed explanations</p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
              <h3>Plan Your Adventure</h3>
              <p>Save your favorite trails and build your personalized High Tatras hiking plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ 
        padding: '4rem 1rem',
        backgroundColor: 'var(--bg-white)'
      }}>
        <div className="container">
          <h2 className="text-center mb-2">Why High Tatras?</h2>
          <p className="text-center mb-3" style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
            The High Tatras offer stunning alpine scenery, crystal-clear mountain lakes, and trails for every skill level - from peaceful valley walks to challenging summit climbs
          </p>

          <div className="grid grid-2">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem' }}>🏔️</span>
              <div>
                <h3>Majestic Peaks</h3>
                <p>Conquer iconic summits like Rysy, Kriváň, and explore dramatic mountain landscapes</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem' }}>💧</span>
              <div>
                <h3>Alpine Lakes</h3>
                <p>Discover pristine mountain lakes (plesa) with crystal-clear water and stunning reflections</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem' }}>🌲</span>
              <div>
                <h3>Diverse Wildlife</h3>
                <p>Spot chamois, marmots, and golden eagles in their natural habitat</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem' }}>🥾</span>
              <div>
                <h3>All Skill Levels</h3>
                <p>From easy lakeside strolls to challenging alpine scrambles - there's something for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 1rem',
        background: 'linear-gradient(135deg, var(--secondary), var(--primary))',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: 'white' }}>Ready to Discover Your Perfect Trail?</h2>
          <p style={{ 
            fontSize: '1.1rem',
            marginBottom: '2rem',
            color: 'rgba(255,255,255,0.9)'
          }}>
            It only takes 2 minutes to find trails perfectly matched to you
          </p>
          <Link to="/quiz" className="btn" style={{ 
            backgroundColor: 'white',
            color: 'var(--primary)',
            fontSize: '1.1rem'
          }}>
            Start Your Journey 🚀
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Welcome
