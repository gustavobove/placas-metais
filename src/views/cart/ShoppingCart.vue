<template>
  <div class="content py-5">
    <ShoppingCart />
  </div>
</template>

<script>
import ShoppingCart from '@/components/cart/ShoppingCart.vue'

export default {
  components: {
    ShoppingCart,
  },
}
</script>

<style lang="scss" scoped>
.content {
  @media (min-width: 1200px) {
    min-height: 100vh;
    background-color: #f6f6f6;
  }
  @media (max-width: 1199.98px) {
    padding-bottom: 32px;
  }
  padding-top: 64px;
}
</style>
