import { isToday } from './utils'

export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

export const title = (value, replacer = ' ') => {
  if (!value) return ''
  const str = value.toString()

  const arr = str.split(replacer)
  const capitalizedArray = []
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalizedArray.push(capitalized)
  })
  return capitalizedArray.join(' ')
}

export const avatarText = value => {
  if (!value) return ''
  const nameArray = value.split(' ')
  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

/**
 * @param {String} value
 * @param {Object} formatting
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('pt-br', formatting).format(new Date(value))
}

export const formatLocalDate = value => {
  if (!value) return 0
  let data = ''
  data = value.split('-').reverse().join('/')
  return data
}

export const formatDateTime = value => {
  if (!value) return 0
  const data = new Date(value)
  return data.toLocaleDateString('pt-br', { hour: '2-digit', minute: '2-digit' })
}

/**
 * @param {String} value
 * @param {Boolean} toTimeForCurrentDay
 */
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('pt-br', formatting).format(new Date(value))
}

export const filterTags = value => value.replace(/<\/?[^>]+(>|$)/g, '')

export const formatNumber = value => {
  if (value) {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2 })
  } return 0
}

export const formatBoolean = (value, ifTrue = 'Sim', ifFalse = 'Não') => {
  value ? ifTrue : ifFalse
}
