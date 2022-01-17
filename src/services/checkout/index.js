import axios from '@/libs/axios'

const userId = localStorage.getItem('userId')
const token = localStorage.getItem('userId')

export default {
  checkout: data => axios.post('/pedidos/checkout',
    {
      usuario: userId,
      produtos: data.produtos,

    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  checkoutProducts: produtos => axios.post('/pedidos/checkout',
    {
      usuario: userId,
      produtos,

    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
}
