import axios from '@/libs/axios'

export default {
  getPartners: () => axios('/sellers'),
}
