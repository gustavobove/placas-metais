<template>
  <div>
    <div class="">
      <div class="position-relative">
        <b-button
          v-b-toggle="'my-collapse-2' + itemIndex"
          class="item"
          variant="primary"
        >
          "{{ frase }}"
        </b-button>
        <button
          class="remove"
          @click="removeItem(itemIndex)"
        >
          <BIconTrashFill
            variant="danger"
            font-scale="1.3"
          />
        </button>
      </div>
      <b-collapse
        :id="'my-collapse-2' + itemIndex"
        visible
      >
        <div class="">
          <b-form-group
            label="Frase"
            class="custom-label-2"
          >
            <b-form-input
              v-model="frase"
              maxlength="115"
              @input="sendQuote"
            />
          </b-form-group>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import {
  BCollapse, BButton, VBToggle, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  directives: {
    'b-toggle': VBToggle,
  },
  components: {
    BCollapse, BButton, BFormGroup, BFormInput,
  },
  props: {
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      frase: null,

    }
  },
  methods: {
    sendQuote() {
      this.setQuote({
        frase: this.frase,
        index: this.itemIndex,
        size: this.frase.length,
      })
    },
    removeItem(index) {
      this.$store.dispatch('placas/setRemoveQuote', index)
      this.$emit('removeQuote', index)
    },
    ...mapActions({ setQuote: 'placas/setQuote' }),
  },
}
</script>

<style lang='scss' scoped>

.item {
  background: #fff;
  width: 100%;
  padding: 25px 16.98px;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
  color: #5B5B5B;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  overflow-wrap: break-word;
  padding-right: 4rem;
  &:after {
      content: '';
      clip-path: polygon(0 50%, 100% 99%, 100% 0);
      display: block;
      width: 12px;
      height: 12px;
      background: #5B5B5B;
      transition: .2s ease-in-out all;
      transform: rotate(180deg);
      position: absolute;
      right: 2rem;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }.not-collapsed {
    &:after {
      transform: rotate(270deg);
    }

}
.remove {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #fff;
  border: none;
  font-size: 12px;
  transform: translateX(100%);
  background-color: transparent;
  display: flex;
}

</style>
