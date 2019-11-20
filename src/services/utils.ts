export function calcDuration(begin: string) {
  const date_now = new Date()
  let seconds = Math.floor((date_now.getTime() - new Date(begin).getTime()) / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  let days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  days = days - months * 30
  hours = hours - days * 24
  minutes = minutes - days * 24 * 60 - hours * 60
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
  return { years, months, days, hours, minutes, seconds }
}

export function NEW_dateDifference(begin: string) {
  const date_now = new Date().getTime()
  const date = new Date(begin).getTime()
  let delta = Math.abs(date - date_now) / 1000
  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = delta % 60

  return { days, hours, minutes, seconds }
}

export function getDurationIntel(begin: string) {
  let duration = NEW_dateDifference(begin)

  if (duration.days > 0) {
    return duration.days + 'd ago'
  } else if (duration.hours > 0) {
    return duration.hours + 'h ago'
  } else if (duration.minutes > 0) {
    return duration.minutes + 'm ago'
  } else {
    return duration.seconds + 's ago'
  }
}

export function calcRotation(index: number, length: number) {
  const step = 10
  const min = length * -5 + 5
  if (length === 1 && index + 1 === 1) {
    return 0
  } else {
    return min + index * step
  }
}

export function calcTranslation(index: number, length: number) {
  const step = 2
  const min = length * -1 + 1
  if (length === 1 && index + 1 === 1) {
    return 0
  } else {
    return Math.abs(Math.abs(min) - index * step)
  }
}
