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

  // quiz questions configuration
  const questions = [
    {
      id: 'fitness',
      question: 'What is your fitness level?',
      type: 'radio',
      options: [
        { value: 'beginner', label: '🚶 Beginner - I prefer easy walks' },
        { value: 'intermediate', label: '🥾 Intermediate - Regular hiker, comfortable with hills' },
        { value: 'advanced', label: '⛰️ Advanced - Experienced hiker, love challenges' },
        { value: 'expert', label: '🏔️ Expert - Technical climbs and long expeditions' }
      ]
    },
    {
      id: 'distance',
      question: 'How long would you like to hike?',
      type: 'radio',
      options: [
        { value: 'short', label: '📏 Short (under 5 km)' },
        { value: 'medium', label: '📏 Medium (5-12 km)' },
        { value: 'long', label: '📏 Long (12-20 km)' },
        { value: 'very-long', label: '📏 Very Long (20+ km)' }
      ]
    },
    {
      id: 'time',
      question: 'How much time do you have?',
      type: 'radio',
      options: [
        { value: '2-3', label: '⏱️ 2-3 hours' },
        { value: '4-6', label: '⏱️ 4-6 hours' },
        { value: '7-10', label: '⏱️ 7-10 hours' },
        { value: 'full-day', label: '⏱️ Full day (10+ hours)' }
      ]
    },
    {
      id: 'features',
      question: 'What would you like to see? (Select all that apply)',
      type: 'checkbox',
      options: [
        { value: 'Peaks', label: '🏔️ Mountain Peaks & Summits' },
        { value: 'Lakes', label: '💧 Alpine Lakes' },
        { value: 'Waterfalls', label: '💦 Waterfalls' },
        { value: 'Valleys', label: '🌄 Valleys & Meadows' },
        { value: 'Wildlife', label: '🦌 Wildlife Spotting' }
      ]
    },
    {
      id: 'season',
      question: 'When are you planning to visit?',
      type: 'radio',
      options: [
        { value: 'Spring', label: '🌸 Spring (March-May)' },
        { value: 'Summer', label: '☀️ Summer (June-August)' },
        { value: 'Autumn', label: '🍂 Autumn (September-November)' },
        { value: 'Winter', label: '❄️ Winter (December-February)' }
      ]
    },
    {
      id: 'group',
      question: 'Who are you hiking with?',
      type: 'radio',
      options: [
        { value: 'Solo', label: '🚶 Solo' },
        { value: 'Family', label: '👨‍👩‍👧‍👦 Family with kids' },
        { value: 'Friends', label: '👥 Friends/Group' },
        { value: 'Experienced', label: '⛰️ Experienced hikers' }
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

  const updateAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    })
  }

  return (
    <main style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        {/* Header */}
        <div className="text-center mb-3">
          <h1>Find Your Perfect Trail</h1>
          <p>Answer {totalSteps} quick questions to get personalized recommendations</p>
        </div>

        {/* Progress bar */}
        <ProgressBar current={currentStep} total={totalSteps} />

        {/* Question card */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ 
            color: 'var(--primary)', 
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Question {currentStep} of {totalSteps}
          </div>

          <QuizQuestion
            question={currentQuestion.question}
            type={currentQuestion.type}
            options={currentQuestion.options}
            value={answers[currentQuestion.id]}
            onChange={updateAnswer}
          />

          {/* Navigation buttons */}
          <div className="flex-between" style={{ marginTop: '2rem' }}>
            <button
              onClick={handleBack}
              className="btn btn-secondary"
              disabled={currentStep === 1}
              style={{ 
                opacity: currentStep === 1 ? 0.5 : 1,
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Back
            </button>

            <button
              onClick={handleNext}
              className="btn btn-primary"
            >
              {currentStep === totalSteps ? 'See Results ✨' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '12px',
          fontSize: '0.9rem',
          color: 'var(--text-gray)'
        }}>
          💡 <strong>Tip:</strong> Be honest about your fitness level - it helps us recommend safer, more enjoyable trails for you!
        </div>
      </div>
    </main>
  )
}

export default Quiz
