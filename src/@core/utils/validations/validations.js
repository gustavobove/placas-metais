import { extend, localize } from 'vee-validate'
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  max as rule_max,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
} from 'vee-validate/dist/rules'

import br from 'vee-validate/dist/locale/pt_BR.json'

import {
  validatorPositive, validatorPassword, validatorCpf, validatorDay, validatorYear, validatorPhone,
} from './validators'

export const required = extend('required', rule_required)
export const email = extend('email', rule_email)
export const min = extend('min', rule_min)
export const max = extend('max', rule_max)
export const confirmed = extend('confirmed', rule_confirmed)
export const regex = extend('regex', rule_regex)
export const between = extend('between', rule_between)
export const alpha = extend('alpha', rule_alpha)
export const integer = extend('integer', rule_integer)
export const digits = extend('digits', rule_digits)
export const alphaDash = extend('alpha-dash', rule_alpha_dash)
export const alphaNum = extend('alpha-num', rule_alpha_num)
export const length = extend('length', rule_length)

export const positive = extend('positive', {
  validate: validatorPositive,
  message: 'Por favor insira um número positivo!',
})

export const day = extend('day', {
  validate: validatorDay,
  message: 'Por favor insira um dia valido!',
})

export const year = extend('year', {
  validate: validatorYear,
  message: 'Por favor insira um ano valido!',
})

export const password = extend('password', {
  validate: validatorPassword,
  message: 'Seu {_field_} deve conter pelo menos um caractere maiúsculo, um minúsculo, um caractere especial e um número',
})

export const cpf = extend('cpf', {
  validate: validatorCpf,
  message: 'Preencha com um CPF válido.',
})

export const phone = extend('phone', {
  validate: validatorPhone,
  message: 'Preencha com um {_field_} válido.',
})

localize({
  en: {
    messages: br.messages,
    names: {
      email: 'Email',
      password: 'Senha',
    },
  },
})
