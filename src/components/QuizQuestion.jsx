const QuizQuestion = ({ question, type, options, value, onChange, optionCount }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-evenly'
    }}>
      {type === 'radio' && (
        <>
          {options.map((option) => (
            <label 
              key={option.value} 
              className="radio-option quiz-spacious"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem',
                backgroundColor: value === option.value ? 'rgba(26, 88, 64, 0.1)' : 'var(--bg-white)',
                border: value === option.value ? '2px solid var(--primary)' : '2px solid var(--border)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                minHeight: '60px',
                boxShadow: value === option.value ? '0 4px 12px rgba(26, 88, 64, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.05)'
              }}
            >
              <input
                type="radio"
                name={question}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                style={{ 
                  marginRight: '0.75rem',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              />
              <span style={{ 
                fontSize: '1rem',
                lineHeight: '1.4',
                color: value === option.value ? 'var(--primary)' : 'var(--text-dark)',
                fontWeight: value === option.value ? '600' : '500'
              }}>
                {option.label}
              </span>
            </label>
          ))}
        </>
      )}

      {type === 'checkbox' && (
        <>
          {options.map((option) => (
            <label 
              key={option.value} 
              className="checkbox-option quiz-spacious"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem',
                backgroundColor: value.includes(option.value) ? 'rgba(26, 88, 64, 0.1)' : 'var(--bg-white)',
                border: value.includes(option.value) ? '2px solid var(--primary)' : '2px solid var(--border)',
                borderRadius: '12px',
                transition: 'all 0.2s',
                minHeight: '60px',
                boxShadow: value.includes(option.value) ? '0 4px 12px rgba(26, 88, 64, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.05)'
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
                  marginRight: '0.75rem',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              />
              <span style={{ 
                fontSize: '1rem',
                lineHeight: '1.4',
                color: value.includes(option.value) ? 'var(--primary)' : 'var(--text-dark)',
                fontWeight: value.includes(option.value) ? '600' : '500'
              }}>
                {option.label}
              </span>
            </label>
          ))}
        </>
      )}
    </div>
  )
}

export default QuizQuestion
