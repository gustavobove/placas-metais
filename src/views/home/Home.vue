<template>
  <div class="login d-xl-flex justify-content-xl-start">
    <b-container>
      <b-row class="h-100">
        <b-col
          xl="6"
          md="12"
          class="align-self-xl-end login__wrapper"
        >
          <span class="login__message"><strong>Eternizando</strong> nomes</span>
          <span class="login__message">Resgatando <strong>Memórias</strong></span>
        </b-col>
        <b-col
          xl="6"
          md="12"
          class="align-self-xl-center d-flex justify-content-xl-end justify-content-center px-0"
        >
          <Home />
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>
<script>
import {
  BContainer, BRow, BCol,
} from 'bootstrap-vue'
import Home from '@/components/home/Home.vue'

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    Home,
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/variables/_variables';
.login {
  height: 100vh;
  width: 100%;
  background-image: url("../../assets/images/login-bg.png");
  background-position: center;
  background-size: cover;
  @media (max-width: 767.98px) {
    height: auto;
    min-height: 100vh;
    padding: 32px 0px;
  }
  &__wrapper {
    @media (max-width: 1199.98px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 1199.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__message {
  font-size: 22px;
  font-weight: 900;
  font-size: 22px;
  line-height: 33px;
  letter-spacing: 0.275em;
  display: table;
  background-color: $blue;
  padding: 10px 22px;
  text-transform: uppercase;
  color: #fff;
  @media (max-width: 767.98px) {
    font-size: 16px;
    text-align: center;
    padding: 5px 10px;
  }

  &:nth-child(1) {
    margin-bottom: 25px;
    @media (max-width: 797.98px) {
      margin-top: 75px;
    }
  }
  &:nth-child(2) {
    margin-bottom: 200px;
    @media (max-width: 1199.98px) {
      margin-bottom: 32px;
    }
  }
    }
}
</style>
