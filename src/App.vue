<template>
  <div id="app">
    <NavigationBar v-if="$route.name !== 'redefinir-senha'" />
    <transition
      name="slide-fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>

import NavigationBar from './components/navigation/NavigationBar.vue'
import rules from '@/services/rules/index'
import userService from '@/services/register/index'

export default {
  components: {
    NavigationBar,
  },
  computed: {
    getCart() {
      return this.$store.state.cart.shoppingCartItems
    },
  },
  watch: {
    getCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(this.$store.state.cart.shoppingCartItems))
    },
  },
  created() {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
    this.$store.commit('cart/SET_FIRST_CART', shoppingCart)
    this.getUserInfos()
  },
  async beforeMount() {
    const { data } = await rules.getRules()

    const charNameLimit = data.limite_nome
    const charPhraseLimit = data.limite_frase

    this.$store.commit('placas/SET_MAXNAMECHAR', charNameLimit)
    this.$store.commit('placas/SET_MAXPHRASECHAR', charPhraseLimit)
  },
  methods: {
    async getUserInfos() {
      const { data } = await userService.getUserData()
      const payload = {
        cep: data.cep || '',
        cidade: data.cidade || '',
        uf: data.uf || '',
        logradouro: data.logradouro || '',
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        numero: data.numero || '',
      }
      this.$store.commit('user/SET_USERDATA', payload)
    },
  },
}
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all .3s ease;
}

</style>
