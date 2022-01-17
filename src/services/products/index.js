import axios from '@/libs/axios'

export default {
  getProducts: data => axios.get('/produtos', {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  }),
}
