export default {
  namespaced: true,
  state: {
    user: {
      cep: '',
      cidade: '',
      uf: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      numero: '',
    },
    completedRegister: false,
  },
  mutations: {
    SET_COMPLETEDREGISTER(state, payload) {
      state.completedRegister = payload
    },
    SET_USERDATA(state, payload) {
      state.user.cep = payload.cep
      state.user.cidade = payload.cidade
      state.user.uf = payload.uf
      state.user.logradouro = payload.logradouro
      state.user.complemento = payload.complemento
      state.user.bairro = payload.bairro
      state.user.numero = payload.numero
    },
  },
}
