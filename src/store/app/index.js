export default {
  namespaced: true,
  state: {
    apiInCall: false,
  },
  getters: {
    getApiInCall: state => state.apiInCall,
  },
  mutations: {
    SET_API_IN_CALL(state, payload) {
      state.apiInCall = payload
    },
  },
  actions: {
  },
}
