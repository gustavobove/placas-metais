import axios from '@/libs/axios'

export default {
  getRules: () => axios.get('produtos/placa-customizada/valores'),
}
