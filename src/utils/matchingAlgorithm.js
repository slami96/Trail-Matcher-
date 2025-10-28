// Smart matching algorithm to score trails based on quiz answers
export const calculateTrailMatch = (trail, quizAnswers) => {
  let score = 0
  const reasons = []

  // Fitness level matching (30 points max)
  const fitnessMap = {
    beginner: ['Easy'],
    intermediate: ['Easy', 'Moderate'],
    advanced: ['Moderate', 'Hard'],
    expert: ['Hard', 'Very Hard']
  }

  if (fitnessMap[quizAnswers.fitness]?.includes(trail.difficulty)) {
    score += 30
    reasons.push(`Perfect for ${quizAnswers.fitness} hikers`)
  } else if (
    (quizAnswers.fitness === 'intermediate' && trail.difficulty === 'Hard') ||
    (quizAnswers.fitness === 'advanced' && trail.difficulty === 'Easy')
  ) {
    score += 15
    reasons.push(`Slight challenge adjustment for ${quizAnswers.fitness} level`)
  }

  // Distance preference (20 points max)
  const distanceRanges = {
    short: [0, 5],
    medium: [5, 12],
    long: [12, 20],
    'very-long': [20, 100]
  }

  const [minDist, maxDist] = distanceRanges[quizAnswers.distance]
  if (trail.distance_km >= minDist && trail.distance_km <= maxDist) {
    score += 20
    reasons.push(`${trail.distance_km}km matches your preferred distance`)
  } else if (
    Math.abs(trail.distance_km - minDist) <= 3 ||
    Math.abs(trail.distance_km - maxDist) <= 3
  ) {
    score += 10
  }

  // Time available (20 points max)
  const timeRanges = {
    '2-3': [0, 3],
    '4-6': [3, 6],
    '7-10': [6, 10],
    'full-day': [10, 24]
  }

  const [minTime, maxTime] = timeRanges[quizAnswers.time]
  if (trail.duration_hours >= minTime && trail.duration_hours <= maxTime) {
    score += 20
    reasons.push(`${trail.duration_hours}h fits your available time`)
  } else if (
    Math.abs(trail.duration_hours - minTime) <= 1.5 ||
    Math.abs(trail.duration_hours - maxTime) <= 1.5
  ) {
    score += 10
  }

  // Features matching (30 points max)
  const featureMatches = quizAnswers.features.filter(f => 
    trail.features.includes(f)
  )
  
  if (featureMatches.length > 0) {
    const featurePoints = Math.min((featureMatches.length / quizAnswers.features.length) * 30, 30)
    score += featurePoints
    
    if (featureMatches.length === 1) {
      reasons.push(`Features ${featureMatches[0].toLowerCase()}`)
    } else if (featureMatches.length === 2) {
      reasons.push(`Features ${featureMatches[0].toLowerCase()} and ${featureMatches[1].toLowerCase()}`)
    } else {
      reasons.push(`Features ${featureMatches.slice(0, 2).join(', ').toLowerCase()}, and more`)
    }
  }

  // Season bonus (5 points)
  if (trail.best_season.includes(quizAnswers.season)) {
    score += 5
    reasons.push(`Best in ${quizAnswers.season}`)
  }

  // Group type bonus (5 points)
  if (trail.suitable_for.includes(quizAnswers.group)) {
    score += 5
  }

  // calculate percentage (max possible score is 100)
  const percentage = Math.min(Math.round(score), 100)

  return {
    score: percentage,
    reasons: reasons.slice(0, 3) // keep top 3 reasons
  }
}

// Sort and return top matches
export const getTopMatches = (trails, quizAnswers, limit = 5) => {
  const scoredTrails = trails.map(trail => ({
    ...trail,
    match: calculateTrailMatch(trail, quizAnswers)
  }))

  // sort by score, highest first
  return scoredTrails
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, limit)
}
