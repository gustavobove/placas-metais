export default {
  state: {
    apiInCall: false,
    isUserLoggedIn: () => {
      const userInfo = localStorage.getItem('accessToken')
      return userInfo || false
    },

  },
  mutations: {
    SET_API_IN_CALL(state, payload) {
      state.apiInCall = payload
    },
  },
}
