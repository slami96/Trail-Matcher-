import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import QuizQuestion from '../components/QuizQuestion'

const Quiz = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  // store all quiz answers
  const [answers, setAnswers] = useState({
    fitness: '',
    distance: '',
    time: '',
    features: [],
    season: '',
    group: ''
  })

  // quiz questions configuration - NO EMOJIS
  const questions = [
    {
      id: 'fitness',
      question: 'What is your fitness level?',
      type: 'radio',
      options: [
        { value: 'beginner', label: 'Beginner - I prefer easy walks' },
        { value: 'intermediate', label: 'Intermediate - Regular hiker, comfortable with hills' },
        { value: 'advanced', label: 'Advanced - Experienced hiker, love challenges' },
        { value: 'expert', label: 'Expert - Technical climbs and long expeditions' }
      ]
    },
    {
      id: 'distance',
      question: 'How long would you like to hike?',
      type: 'radio',
      options: [
        { value: 'short', label: 'Short (under 5 km)' },
        { value: 'medium', label: 'Medium (5-12 km)' },
        { value: 'long', label: 'Long (12-20 km)' },
        { value: 'very-long', label: 'Very Long (20+ km)' }
      ]
    },
    {
      id: 'time',
      question: 'How much time do you have?',
      type: 'radio',
      options: [
        { value: '2-3', label: '2-3 hours' },
        { value: '4-6', label: '4-6 hours' },
        { value: '7-10', label: '7-10 hours' },
        { value: 'full-day', label: 'Full day (10+ hours)' }
      ]
    },
    {
      id: 'features',
      question: 'What would you like to see? (Select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'Peaks', label: 'Mountain Peaks & Summits' },
        { value: 'Lakes', label: 'Alpine Lakes' },
        { value: 'Waterfalls', label: 'Waterfalls' },
        { value: 'Valleys', label: 'Valleys & Meadows' },
        { value: 'Wildlife', label: 'Wildlife Spotting' }
      ]
    },
    {
      id: 'season',
      question: 'When are you planning to visit?',
      type: 'radio',
      options: [
        { value: 'Spring', label: 'Spring (March-May)' },
        { value: 'Summer', label: 'Summer (June-August)' },
        { value: 'Autumn', label: 'Autumn (September-November)' },
        { value: 'Winter', label: 'Winter (December-February)' }
      ]
    },
    {
      id: 'group',
      question: 'Who are you hiking with?',
      type: 'radio',
      options: [
        { value: 'Solo', label: 'Solo' },
        { value: 'Family', label: 'Family with kids' },
        { value: 'Friends', label: 'Friends/Group' },
        { value: 'Experienced', label: 'Experienced hikers' }
      ]
    }
  ]

  const currentQuestion = questions[currentStep - 1]

  const handleNext = () => {
    // make sure the current question is answered
    if (currentQuestion.type === 'checkbox') {
      if (answers[currentQuestion.id].length === 0) {
        alert('Please select at least one option')
        return
      }
    } else {
      if (!answers[currentQuestion.id]) {
        alert('Please select an option')
        return
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // quiz complete - save answers and go to results
      localStorage.setItem('quizAnswers', JSON.stringify(answers))
      navigate('/results')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleHome = () => {
    navigate('/')
  }

  const updateAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    })
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      height: '100vh',
      overflow: 'hidden',
      padding: '0.75rem',
      backgroundColor: 'var(--bg-white)'
    }}>
      <div style={{ 
        maxWidth: '700px', 
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
      }}>
        {/* Ultra-Compact Header */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <h1 style={{ 
              fontSize: '1.25rem', 
              margin: 0,
              fontWeight: '700'
            }}>
              Question {currentStep} of {totalSteps}
            </h1>
            <span style={{ 
              fontSize: '0.85rem',
              color: 'var(--text-gray)',
              fontWeight: '600'
            }}>
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          
          {/* Thin Progress bar */}
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>

        {/* Question Section - Takes remaining space */}
        <div style={{ 
          flex: 1, 
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          marginBottom: '0.75rem'
        }}>
          <h2 style={{ 
            fontSize: '1.1rem',
            marginBottom: '0.75rem',
            fontWeight: '600',
            color: 'var(--text-dark)'
          }}>
            {currentQuestion.question}
          </h2>

          {/* Options with smart grid */}
          <div style={{ 
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            <QuizQuestion
              question={currentQuestion.question}
              type={currentQuestion.type}
              options={currentQuestion.options}
              value={answers[currentQuestion.id]}
              onChange={updateAnswer}
              optionCount={currentQuestion.options.length}
            />
          </div>
        </div>

        {/* Navigation buttons - 3 buttons in a row */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.5rem',
          paddingBottom: '0.5rem'
        }}>
          <button
            onClick={handleBack}
            className="btn btn-secondary"
            disabled={currentStep === 1}
            style={{ 
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              padding: '0.75rem 0.5rem',
              fontSize: '0.9rem',
              minHeight: '44px'
            }}
          >
            Back
          </button>

          <button
            onClick={handleHome}
            className="btn btn-secondary"
            style={{ 
              padding: '0.75rem 0.5rem',
              fontSize: '0.9rem',
              minHeight: '44px'
            }}
          >
            Home
          </button>

          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ 
              padding: '0.75rem 0.5rem',
              fontSize: '0.9rem',
              minHeight: '44px'
            }}
          >
            {currentStep === totalSteps ? 'Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
