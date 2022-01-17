import axios from '@/libs/axios'

const token = localStorage.getItem('userId')

export default {
  getOrders: filter => axios(`usuarios/logado/pedidos?${new URLSearchParams(filter).toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getOrdersStatus: () => axios('/pedido-status', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getSupervisores: () => axios('/supervisores', {
    headers: {
      Authorization: `Bearer ${token}`,

    },
  }),
  downloadOrders: () => axios('/pedidos/exportar/csv', {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,

    },
  }),
}
