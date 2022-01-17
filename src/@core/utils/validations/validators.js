/* eslint-disable no-plusplus */
/* eslint-disable radix */
export const validatorPhone = value => {
  const arr = value.split('')
  // 88 1122-3322
  if (arr.length < 19 || arr.every(param => arr[0] === param)) {
    return false
  }
  return true
}

export const validatorPositive = value => {
  if (value >= 0) {
    return true
  }
  return false
}

export const validatorDay = day => {
  if (day >= 1 && day <= 31) {
    return true
  }
  return false
}

export const validatorYear = year => {
  if (year >= new Date().getFullYear() && year <= 2100) {
    return true
  }
  return false
}

export const validatorPassword = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)
  return validPassword
}

export const validatorCpf = cpfValue => {
  let cpf = cpfValue
  if (cpf === undefined) return false
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf === '') return false
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11
      || cpf === '00000000000'
      || cpf === '11111111111'
      || cpf === '22222222222'
      || cpf === '33333333333'
      || cpf === '44444444444'
      || cpf === '55555555555'
      || cpf === '66666666666'
      || cpf === '77777777777'
      || cpf === '88888888888'
      || cpf === '99999999999'
  ) return false
  // Valida 1o digito
  let rev
  let add = 0
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
  rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(9))) return false
  // Valida 2o digito
  add = 0
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(10))) return false

  return true
}
