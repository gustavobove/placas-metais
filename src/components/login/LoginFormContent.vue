<template>
  <div class="login-form form-position position-relative">
    <b-spinner
      v-if="loading"
      variant="primary"
      class="login-form__loading"
    />
    <h2 class="login-form__title mb-0">
      Área logada
    </h2>
    <span class="login-form__small-title">Reservada para Parceiros Comerciais </span>

    <b-form-group
      label="E-mail"
      label-class=""
    >
      <b-form-input v-model="userData.identifier" />
    </b-form-group>
    <b-form-group label="Senha">
      <b-form-input
        v-model="userData.password"
        type="password"
        @keyup.enter="login"
      />
    </b-form-group>
    <BButton
      variant="primary"
      block
      class="d-flex align-items-center login-form__submit"
      @click="login"
    >
      <span
        class="mx-auto"
      > Entrar</span>
      <EnterSvg />
    </BButton>
    <a
      class="login-form__password-recovery"
      @click="$emit('passwordRecovery')"
    >Esqueci a senha </a>
    <a
      class="login-form__commercial-partner"
      @click="$emit('signUp')"
    > Quero ser um parceiro comercial</a>
  </div>
</template>

<script>
import {
  BFormGroup, BFormInput, BButton, BSpinner,
} from 'bootstrap-vue'
import EnterSvg from '@/assets/icons/Enter.vue'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    EnterSvg,
    BSpinner,

  },
  data() {
    return {
      loading: '',
      userData: {
        identifier: '',
        password: '',
      },
    }
  },
  methods: {

    login() {
      this.loading = true
      useJwt.login(this.userData).then(res => {
        useJwt.setToken(res.data.jwt)
        localStorage.setItem('userId', res.data.user.id)
        this.$router.push('/placas')
      }).catch(() => {
        this.$bvToast.toast('Verifique seu email e senha', {
          title: 'Email ou senha incorretos',
          variant: 'danger',

        })
      })
      this.loading = false
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/pages/_login.scss';
.login-form {
&__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
  }
  &__submit {
    border: 3px solid $blue;
    margin-top: 1px;
  }
  &__password-recovery {
    font-size: 12px;
    line-height: 18px;
    text-decoration: underline;
    margin-top: 17px;
    display: block;
  }
  &__commercial-partner {
    font-size: 12px;
    line-height: 18px;
    text-decoration: underline;
    color: $blue;
    font-weight: 700;
    margin-top: 20px;
    display: block;
  }
  input {
    background: #FFFFFF;
    border: 3px solid $blue;
  }
  legend {
    margin-bottom: 11px;
    padding: 0;
  }
  a {
    cursor: pointer;
  }
}
</style>
