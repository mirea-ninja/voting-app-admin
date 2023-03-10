export function formatDate(rawDate: string) {
  const date = new Date(rawDate)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${Math.floor(day / 10) != 0 ? day : '0' + day}.${
    Math.floor(month / 10) != 0 ? month : '0' + month
  }.${year} ${Math.floor(hour / 10) != 0 ? hour : '0' + hour}:${
    Math.floor(minute / 10) != 0 ? minute : '0' + minute
  }`
}
