<template>
  <div class="bg-grey">
    <div class="container">
      <AllProducts />
    </div>
  </div>
</template>

<script>

import AllProducts from './item/AllProducts.vue'

export default {
  components: {
    AllProducts,
  },

}
</script>

<style lang='scss' scoped>
.bg-grey {
  background-color: #F8F8F8;
  padding-top: 32px;
  min-height: 100vh;
}
</style>
