<template>
  <div class="content">
    <div class="container">
      <keep-alive>
        <Placas />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Placas from '@/components/placas/Placas.vue'

export default {
  components: {
    Placas,
  },

}
</script>

<style>
.content {
  background: #f8f8f8;
  min-height: 90vh;
}
</style>
