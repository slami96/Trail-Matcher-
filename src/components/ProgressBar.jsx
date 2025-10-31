const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100

  return (
    <div style={{
      width: '100%',
      height: '4px',
      backgroundColor: 'var(--border)',
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
      <div 
        style={{ 
          height: '100%',
          width: `${percentage}%`,
          background: 'linear-gradient(90deg, var(--primary), var(--primary-light))',
          borderRadius: '10px',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  )
}

export default ProgressBar
