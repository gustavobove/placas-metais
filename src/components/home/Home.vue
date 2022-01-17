<template>
  <div>
    <h2 class="form-position">
      Encontre o parceiro mais <br>  perto de você:
    </h2>
    <div class="login-form form-position px-0 py-0">
      <Partners />
    </div>

  </div>
</template>

<script>
import Partners from '@/components/partners/Partners.vue'

export default {
  components: {
    Partners,
  },
  data() {
    return {
      validator: false,
    }
  },
  methods: {
    signUp() {
      this.validator = true
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/pages/_login.scss';
h2 {
font-family: Poppins;
font-weight: bold;
font-size: 22px;
line-height: 33px;
color: $blue;
margin-bottom: 20px;
}

</style>
