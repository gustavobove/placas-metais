<template>
  <div class="item">
    <span class="d-block"> <strong>{{ companyName }}</strong> </span>
    <span class="d-block mt-3">{{ name }}</span>
    <div> <span> {{ contactNumber }} | {{ email }} </span></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
}

</script>

<style lang='scss' scoped>
@import '../../../assets/scss/variables/_variables.scss';

.item {
  padding: 18px 31px;
  font-family: $vnormal;

}
</style>
