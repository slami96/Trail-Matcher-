const QuizQuestion = ({ question, type, options, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{question}</label>
      
      {type === 'radio' && (
        <div className="radio-group">
          {options.map((option) => (
            <div key={option.value} className="radio-option">
              <input
                type="radio"
                id={option.value}
                name={question}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      )}

      {type === 'checkbox' && (
        <div className="checkbox-group">
          {options.map((option) => (
            <div key={option.value} className="checkbox-option">
              <input
                type="checkbox"
                id={option.value}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...value, option.value])
                  } else {
                    onChange(value.filter(v => v !== option.value))
                  }
                }}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuizQuestion
