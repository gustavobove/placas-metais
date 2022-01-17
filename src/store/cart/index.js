/* eslint-disable no-unused-vars */
export default {
  namespaced: true,
  state: {
    shoppingCartItems: [],
    cartTotal: 0,
    image: '',
    getImage: false,
  },

  mutations: {
    SET_NAME(state, payload) {
      state.names.push(payload)
    },
    SET_FIRST_CART(state, payload) {
      state.shoppingCartItems = payload
    },
    SET_CLEANCART(state) {
      console.log('clean')
      state.shoppingCartItems = []
    },
    SET_IMAGE_STATUS(state, payload) {
      state.getImage = payload
    },
    SET_IMAGE_IN_ARRAY(state, payload) {
      state.shoppingCartItems[state.shoppingCartItems.length - 1].image = payload
    },
    SET_IMAGE(state, payload) {
      if (payload) {
        state.image = payload
      }
    },
    SET_ITEM(state, payload) {
      if (state.shoppingCartItems.find(item => item.type === 'placa-personalizada')) {
        state.shoppingCartItems.push(payload)
      } else if (state.shoppingCartItems.find(item => item.name === payload.name)) {
        const index = state.shoppingCartItems.findIndex(item => item.name === payload.name)
        const value = payload.quantity
        state.shoppingCartItems[index].quantity += value
      } else {
        state.shoppingCartItems.push(payload)
      }
    },
    UPDATE_ITEM(state, payload) {
      console.log('update item')
      state.shoppingCartItems[payload.index].quantity = payload.quantity
    },
    DELETE_ITEM(state, index) {
      console.log('item to remove', state.shoppingCartItems[index].price)
      state.cartTotal -= state.shoppingCartItems[index].price
      state.shoppingCartItems.splice(index, 1)
    },
    UPDATE_TOTAL(state, payload) {
      state.cartTotal = payload
    },
  },
  actions: {
    updateItem({ commit, state }, payload) {
      const total = state.shoppingCartItems.reduce((sum, current) => sum + current.price * current.quantity, 0)
      commit('UPDATE_TOTAL', total)
    },
    setShoppingCartItem({ commit }, payload) {
      commit('SET_ITEM', payload)
    },
    setUpdateItemQtd({ commit, dispatch }, payload) {
      commit('UPDATE_ITEM', payload)
      dispatch('updateItem')
    },

  },
  getters: {
    getImage: state => state.getImage,
  },
}
