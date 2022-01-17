<template>
  <div>
    <LoginFormContent
      v-if="loginPage"
      @passwordRecovery="passwordRecovery"
      @signUp="signUp"
    />
    <PassowrdRecovery
      v-if="passwordPage"
      @returnToLogin="returnToLogin"
    />
    <SignUpForm
      v-if="signUpPage"
      @returnToLogin="returnToPage"
    />
  </div>
</template>

<script>
import LoginFormContent from './LoginFormContent.vue'
import PassowrdRecovery from './PasswordRecovery.vue'
import SignUpForm from './SignUpForm.vue'

export default {
  components: {
    LoginFormContent,
    PassowrdRecovery,
    SignUpForm,
  },
  data() {
    return {
      loginPage: true,
      passwordPage: false,
      signUpPage: false,
    }
  },
  methods: {
    passwordRecovery() {
      this.loginPage = false
      this.passwordPage = true
    },
    returnToLogin() {
      this.loginPage = true
      this.passwordPage = false
    },
    signUp() {
      this.signUpPage = true
      this.loginPage = false
      this.passwordPage = false
    },
    returnToPage() {
      this.signUpPage = false
      this.loginPage = true
    },
  },
}

</script>

<style>

</style>
