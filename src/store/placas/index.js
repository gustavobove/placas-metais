export default {
  namespaced: true,
  state: {
    nomes: [],
    frases: [],
    dimensions: null,
    sumLines: null,
    price: null,
    totalLines: null,
    dimensionsStr: '',
    image: '',
    getImage: false,
    maxNameChar: null,
    maxPhraseChar: null,
    nameRules: [],
    placaSize: '',
    cleanInputs: false,
    setPrint: false,
    customSize: false,
    customSizeValue: null,
  },

  mutations: {
    SET_CUSTOMSIZE(state, payload) {
      state.customSize = payload
    },
    SET_CUSTOMSIZEVALUE(state, payload) {
      state.customSizeValue = payload
    },
    SET_PRINT(state) {
      state.setPrint = !state.setPrint
      console.log('setPrint', state.setPrint)
    },
    SET_CLEANINPUTS(state) {
      state.cleanInputs = !state.cleanInputs
    },
    SET_PLACASIZE(state, payload) {
      state.placaSize = payload
    },
    SET_NONAMES(state) {
      state.nomes = []
    },
    SET_NOQUOTES(state) {
      state.frases = []
    },
    SET_NAME(state, payload) {
      state.nomes.push(payload)
    },
    SET_NAMERULES(state, payload) {
      state.nameRules = payload
    },
    SET_MAXNAMECHAR(state, payload) {
      state.maxNameChar = payload
    },
    SET_MAXPHRASECHAR(state, payload) {
      state.maxPhraseChar = payload
    },
    SET_QUOTE(state, payload) {
      state.frases.push(payload)
    },
    SET_DIMENSIONS(state, payload) {
      console.log('payload', payload)
      state.dimensions = payload
    },
    SET_PRICE(state, payload) {
      state.price = payload
    },
    SET_REMOVE_NAME(state, payload) {
      state.nomes.splice(payload, 1)
    },
    SET_REMOVE_QUOTE(state, payload) {
      state.frases.splice(payload, 1)
    },
    SET_CLEAN_ARRAY(state) {
      state.nomes = []
      state.frases = []
    },

  },
  actions: {
    setName({ state, commit }, payload) {
      if (state.nomes.filter(arr => arr.index === payload.index).length > 0) {
        state.nomes[payload.index].nome = payload.nome
        state.nomes[payload.index].data_nascimento = payload.data_nascimento
        state.nomes[payload.index].data_morte = payload.data_morte
        state.nomes[payload.index].size = Math.ceil(payload.size / state.maxNameChar) < 1 ? 1 : Math.ceil(payload.size / state.maxNameChar)
      } else {
        commit('SET_NAME', payload)
      }
    },
    setQuote({ state, commit }, payload) {
      if (state.frases.filter(arr => arr.index === payload.index).length > 0) {
        state.frases[payload.index].frase = payload.frase
        state.frases[payload.index].size = Math.ceil(payload.size / state.maxPhraseChar) <= 1 ? 1 : Math.ceil(payload.size / state.maxPhraseChar)
      } else {
        commit('SET_QUOTE', payload)
      }
    },
    setDimensions({ commit }, payload) {
      commit('SET_DIMENSIONS', payload)
    },
    setPrice({ commit }, payload) {
      commit('SET_PRICE', payload)
    },
    setRemoveItem({ commit }, payload) {
      commit('SET_REMOVE_NAME', payload)
    },
    setRemoveQuote({ commit }, payload) {
      commit('SET_REMOVE_QUOTE', payload)
    },
  },

  getters: {
    getLines: state => state.totalLines,
    getImage: state => state.getImage,
    getCleanInputStatus: state => state.cleanInputs,
  },
}
