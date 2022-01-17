import Vue from 'vue'
import Vuex from 'vuex'

// modules
// import createPersistedState from 'vuex-persistedstate'
import app from './app'
import placas from './placas/index'

import cart from './cart/index'
import auth from './auth/index'
import user from './user/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    placas,
    cart,
    auth,
    user,
  },
  // plugins: [createPersistedState()],
})
