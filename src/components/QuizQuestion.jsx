const QuizQuestion = ({ question, type, options, value, onChange, optionCount }) => {
  // Determine if we should use grid layout (4+ options)
  const useGrid = optionCount >= 4

  return (
    <div>
      {type === 'radio' && (
        <div 
          className="radio-group"
          style={useGrid ? {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem'
          } : {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {options.map((option) => (
            <label 
              key={option.value} 
              className="radio-option quiz-compact"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: value === option.value ? 'rgba(26, 88, 64, 0.1)' : 'var(--bg-white)',
                border: value === option.value ? '2px solid var(--primary)' : '2px solid var(--border)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                minHeight: '44px'
              }}
            >
              <input
                type="radio"
                name={question}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                style={{ 
                  marginRight: '0.5rem',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              />
              <span style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.3',
                color: value === option.value ? 'var(--primary)' : 'var(--text-dark)',
                fontWeight: value === option.value ? '600' : '500'
              }}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}

      {type === 'checkbox' && (
        <div 
          className="checkbox-group"
          style={useGrid ? {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem'
          } : {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {options.map((option) => (
            <label 
              key={option.value} 
              className="checkbox-option quiz-compact"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: value.includes(option.value) ? 'rgba(26, 88, 64, 0.1)' : 'var(--bg-white)',
                border: value.includes(option.value) ? '2px solid var(--primary)' : '2px solid var(--border)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                minHeight: '44px'
              }}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={value.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...value, option.value])
                  } else {
                    onChange(value.filter(v => v !== option.value))
                  }
                }}
                style={{ 
                  marginRight: '0.5rem',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              />
              <span style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.3',
                color: value.includes(option.value) ? 'var(--primary)' : 'var(--text-dark)',
                fontWeight: value.includes(option.value) ? '600' : '500'
              }}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuizQuestion
