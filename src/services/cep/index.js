import axios from '@/libs/axios'

export default {
  getAddress: payload => axios.get(`http://www.viacep.com.br/ws/${payload}/json`, {
    headers: {
    },
  }),
}
