<template>
  <div class="position-relative">
    <span
      v-if="quantity"
      class="added-to-cart"
    > {{ quantity }} </span>
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="$emit('openCartPage')"
    >
      <path
        d="M4.26331 5H18.0533C18.3327 5.00001 18.609 5.05857 18.8644 5.17191C19.1199 5.28524 19.3487 5.45083 19.5362 5.65801C19.7236 5.86519 19.8656 6.10936 19.953 6.37478C20.0403 6.64019 20.0711 6.92097 20.0433 7.199L19.4433 13.199C19.394 13.6925 19.163 14.1501 18.7953 14.4829C18.4275 14.8157 17.9493 15 17.4533 15H7.90331C7.44078 15.0002 6.99248 14.84 6.63475 14.5469C6.27702 14.2537 6.03196 13.8456 5.94131 13.392L4.26331 5Z"
        stroke="#312C99"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M4.26331 5L3.45331 1.757C3.39913 1.54075 3.27426 1.34881 3.09851 1.21166C2.92277 1.0745 2.70623 1.00001 2.48331 1H1.26331"
        stroke="#312C99"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.26331 19H9.26331"
        stroke="#312C99"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.2633 19H17.2633"
        stroke="#312C99"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>

</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables/_variables';
svg {
  cursor: pointer;
}
.added-to-cart {
background-color: $blue;
color: #fff;
border-radius: 100px;
width: 15px;
height: 15px;
display: block;
font-size: 10px;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
right: 0;
top: 0;
transform: translateX(50%) translateY(-50%);
}
</style>
