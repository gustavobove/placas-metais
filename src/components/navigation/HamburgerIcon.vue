<template>
  <div @click="$emit('toggleNavbar')">
    <tasty-burger-button
      color="#312C99"
      active-color="#fff"
      type="stand"
      :active="active"
    />
  </div>
</template>

<script>
import { TastyBurgerButton } from 'vue-tasty-burgers'

export default {
  components: {
    'tasty-burger-button': TastyBurgerButton,
  },
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },

}
</script>

<style lang='scss' scoped >

</style>
