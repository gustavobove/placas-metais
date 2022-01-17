<template>
  <div id="page-title">
    <div
      v-if="$route.meta.title "
      class="page-name"
    >
      <h2 class="d-flex justify-content-start">
        {{ $route.meta.title }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
