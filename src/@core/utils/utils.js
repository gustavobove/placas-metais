export const isObject = obj => typeof obj === 'object' && obj !== null

export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const getUrlParams = () => {
  const vars = {}
  // eslint-disable-next-line no-unused-vars
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    (m, key, value) => {
      vars[key] = value
    })
  return vars
}
