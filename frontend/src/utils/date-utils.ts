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

export const formatTime = (date: Date): string => {
  let hour = date.getHours()
  let meridian = 'am'
  if (hour > 12) {
    hour = hour - 12
    meridian = 'pm'
  }
  return `${hour}:${date.getMinutes()}${meridian}`
}
