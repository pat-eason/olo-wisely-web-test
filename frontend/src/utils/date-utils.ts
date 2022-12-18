const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

/**
 * Format Date object to `YYYY-MM-DD` format
 * @param date
 */
export const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

/**
 * Format Date object to `(dddd) YYYY-MM-DD` format
 * @param date
 */
export const formatDateWithWeekday = (date: Date): string => {
  return `${weekdays[date.getDay()]} ${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`
}

export const formatTime = (time: number): string => {
  const timeString = String(time).padStart(4, '0')
  let hours = Number.parseInt(timeString.slice(0, 2))
  const minutes = timeString.slice(2, 4)
  let meridiem = 'am'
  if (hours >= 12) {
    hours = hours > 12 ? hours - 12 : hours
    meridiem = 'pm'
  }
  return `${hours}:${minutes}${meridiem}`
}
