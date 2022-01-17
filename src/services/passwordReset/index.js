import axios from '@/libs/axios'

export default {
  resetPassword: data => axios.post('/auth/reset-password', data),
}
