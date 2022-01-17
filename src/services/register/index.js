import axios from '@/libs/axios'

const token = localStorage.getItem('accessToken')
export default {
  register: data => axios.post('/auth/local/register', data),
  getUserData: () => axios.get('/usuarios/logado/dados'),
  updateData: payload => axios.put('/users/me', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
}
