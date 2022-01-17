<template>
  <div class="content">

    <div class="d-flex flex-column wrapper">
      <h1 class="text-center">
        Redefina sua senha
      </h1>
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
      >
      <input
        v-model="passwordConfirm"
        type="password"
        placeholder="Confirma a senha"
      >
      <b-spinner
        v-if="loading"
        class="loading"
      />
      <span
        v-if="!passwordMatch"
        class="text-danger text-center"
      > As senhas não são iguais. </span>
      <b-button
        variant="primary"
        @click="resetPassowrd"
      >
        Redefinir senha
      </b-button>
    </div>
  </div>
</template>

<script>

import { BButton, BSpinner } from 'bootstrap-vue'
import services from '@/services/passwordReset/index'

export default {
  components: {
    BButton,
    BSpinner,
  },
  data() {
    return {
      password: '',
      passwordConfirm: '',
      token: '',
      passwordMatch: true,
      loading: false,
    }
  },
  created() {
    this.token = this.$route.query.code
  },
  methods: {
    resetPassowrd() {
      if (this.password === this.passwordConfirm) {
        this.passwordMatch = true
        this.loading = true
        services.resetPassword({
          code: this.token,
          password: this.password,
          passwordConfirmation: this.passwordConfirm,
        }).then(() => {
          this.$bvToast.toast('Você será redirecionado para a tela de login', {
            title: 'Senha redefinida com sucesso',
            variant: 'success',
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 4000)
        }).catch(() => {
          this.$bvToast.toast('Não conseguimos alterar sua senha. Tente novamente mais tarde.', {
            title: 'Erro ao alterar senha',
            variant: 'danger',

          })
        })
        this.loading = false
      } else {
        this.passwordMatch = false
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.content {
width: 100vw;
height: 100vh;
overflow: hidden;
display: flex;
justify-content: center;
align-items: center;
background-color: #3f38cc;

img {
  width: 100px;
  display: block;
  margin: 15px auto;
}
input {
  display: block;
  margin: 5px auto;
  width: 100%;
  height: 45px;
  padding-left: 10px;
}
h1 {
  font-size: 27px;
  text-align: center;
  color: #ffff;
}
button {
  margin-top: 1rem;
}
}
.loading {
margin: 10px auto;
color: #fff;
}
</style>
