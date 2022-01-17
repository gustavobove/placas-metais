<template>
  <div class="partner">
    <BButton
      v-b-toggle="'my-collapse' + itemIndex"
      variant="primary"
      class="partner__toggle-item d-flex align-items-center justify-content-between"
    >
      {{ state }}
      <span class="partner__toggle-icon" />
    </BButton>
    <b-collapse :id="'my-collapse' + itemIndex">
      <div class="partner">
        <Items
          v-for="(item, index) in partner"
          :key="index"
          :name="item.username"
          :company-name="item.razaoSocial"
          :uf="item.uf"
          :email="item.email"
          :contact-number="item.telefone"
        />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { BButton, BCollapse, VBToggle } from 'bootstrap-vue'
import Items from './items.vue'

export default {
  directives: {
    'b-toggle': VBToggle,
  },
  components: {
    Items,
    BButton,
    BCollapse,
  },
  props: {
    partner: {
      type: Array,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    itemIndex: {
      type: String,
      required: true,
    },
  },

}
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/variables/_variables.scss';
.partner {

  &__toggle-item {
    width: 100%;
    height: 100%;
    background-color: $blue;
    display: block;
    color: #fff;
    padding: 10px 18px;
    cursor: pointer;
    border: none;
    border-radius: 0;
    &:after {
      content: '';
      clip-path: polygon(0 50%, 100% 99%, 100% 0);
      display: block;
      width: 12px;
      height: 12px;
      background-color: #fff;
      transition: .2s ease-in-out all;
      transform: rotate(180deg);
    }
  }.not-collapsed {
    &:after {
      transform: rotate(270deg);
    }
  }

}
</style>
