import axios from '@/libs/axios'

const token = localStorage.getItem('accessToken')

export default {
  getProducts: payload => axios.get(`/produtos?_publicationState=${payload}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  /* eslint-disable camelcase */
  updateMargin: (productId, margem_percentual, userId, internalId) => axios.put(`/cliente-lucro-produtos/${internalId}`, {
    produto: productId,
    margem_percentual,
    usuario: userId,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  /* eslint-disable camelcase */
  createMargin: (productId, margem_percentual, userId) => axios.post('/cliente-lucro-produtos/', {
    margem_percentual,
    produto: productId,
    usuario: userId,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
}
