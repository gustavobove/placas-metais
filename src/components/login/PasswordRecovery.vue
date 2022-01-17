<template>
  <div
    class="login-form form-position position-relative"
    :class="!isSent ? 'd-flex flex-column' : ''"
  >
    <b-spinner
      v-if="loading"
      variant="primary"
      class="login-form___loading"
    />
    <a
      class="login-form__return"
      @click="$emit('returnToLogin')"
    >Voltar</a>
    <div v-if="isSent">
      <h2 class="login-form__title">
        Reset de senha
      </h2>
      <b-form-group label="Informe o e-mail de cadastro">
        <b-form-input v-model="email" />
      </b-form-group>
      <b-button
        variant="primary"
        class="login-form__submit"
        @click="sendPassword"
      >
        Enviar confirmação
      </b-button>
    </div>
    <div
      v-else
      class="align-self-center my-auto"
    >
      <span class="d-block login-form__sent-email">Enviamos instruções no seu e-mail.</span>
      <span class="d-block login-form__thanks-message">Obrigado ;)</span>
    </div>
  </div>
</template>

<script>
import {
  BFormGroup, BFormInput, BButton, BSpinner,
} from 'bootstrap-vue'
import passwordRecovery from '@/services/passwordRecovery/index'

export default {
  components: {
    BFormGroup, BFormInput, BButton, BSpinner,
  },
  data() {
    return {
      isSent: true,
      email: '',
      loading: false,
    }
  },
  methods: {
    sendPassword() {
      this.loading = true

      const payload = { email: this.email, url: 'http//localhost:8080/login' }
      passwordRecovery.passwordReset(payload).then(() => {
        this.isSent = !this.isSent
      }).catch(() => {
        this.$bvToast.toast('Verifique se seu e-mail está correto', {
          title: 'Ocorreu um erro ao enviar.',
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
  @media (min-width: 1981px) {
    transform: translateX(25%);
  }
  @media (max-width: 1980px) {
    transform: translateX(16%);
  }
  @media (max-width: 1800px) {
    transform: translateX(13%);
  }
  @media (max-width: 1600px) {
    transform: translateX(10%);
  }
  @media (max-width: 1500px) {
    transform: translateX(7%);
  }
  @media (max-width: 1300px) {
    transform: translateX(5%);
  }
  @media (max-width: 1200px) {
    transform: translateX(0%);
  }
  &__return {
  font-size: 12px;
  line-height: 18px;
  text-decoration-line: underline;
  color: $blue;
  }
  &__title {
  font-weight: bold;
  font-size: 22px;
  line-height: 33px;
  color: $blue;
  margin-top: 40px;
  margin-bottom: 30px;
  }
  &__submit {
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  width: 197px;
  font-weight: 300;
  padding: 10px 0px;
  border-radius: 0;
  }
  &__sent-email {
  font-size: 12px;
  line-height: 18px;
  color: $blue;
  white-space: nowrap;
  @media (max-width: 575.98px) {
    margin-top: 16px;
    display: block;
  }
  }
  &__thanks-message {
  font-weight: bold;
  font-size: 22px;
  line-height: 33px;
  color: $blue;
  margin-top: 10px;

  }
  a {
    cursor: pointer;
  }
}
</style>
