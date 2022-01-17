import axios from '@/libs/axios'

export default {
  passwordReset: data => axios.post('/auth/forgot-password', data),
}
