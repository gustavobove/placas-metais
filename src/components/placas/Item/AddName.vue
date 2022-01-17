<template>
  <div class="position-relative">
    <div class="position-relative">
      <b-button
        v-b-toggle="'my-collapse' + itemIndex"
        class="item"
        variant="primary"
      >
        {{ nome }}
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
      :id="'my-collapse' + itemIndex"
      visible
    >

      <div class="">
        <b-form-group
          label="Nome"
          class="custom-label-2"
        >
          <b-form-input
            v-model="nome"
            maxlength="115"
            @input="sendName"
          />
        </b-form-group>
        <div class="d-flex">
          <b-form-group
            label="Nascimento"
            class="custom-label-2 mr-5"
          >
            <b-form-input
              v-model="data_nascimento"
              v-mask="'##/##/####'"
              type="text"
              @input="sendName"
            />
          </b-form-group>
          <b-form-group

            label="Falescimento"
            class="custom-label-2"
          >
            <b-form-input
              v-model="data_morte"
              v-mask="'##/##/####'"
              type="text"
              @input="sendName"
            />
          </b-form-group>
        </div>

      </div>
    </b-collapse>

  </div>
</template>

<script>
import {
  BCollapse, BButton, VBToggle, BFormGroup, BFormInput,
  BIconTrashFill,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  directives: {
    'b-toggle': VBToggle,
  },
  components: {
    BCollapse, BButton, BFormGroup, BFormInput, BIconTrashFill,
  },
  props: {
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      nome: '',
      data_nascimento: '',
      data_morte: '',
    }
  },
  computed: {
    maxLengthReached() {
      const lines = this.$store.state.placas.dimensions
      if (lines > 12) {
        return true
      }
      return false
    },

  },

  methods: {
    removeItem(index) {
      this.$store.dispatch('placas/setRemoveItem', index)
      this.$emit('removeItem', index)
    },
    sendName() {
      this.setName({
        nome: this.nome, index: this.itemIndex, data_nascimento: this.data_nascimento, data_morte: this.data_morte, size: this.nome.length,
      })
    },
    ...mapActions({ setName: 'placas/setName' }),
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
  padding-right: 3.5rem;
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
