<template>
  <div>
    <b-modal
      id="modal-2"
      size="sm"
      centered
      lazy
      @shown="setInitialValue"
    >
      <div class="">
        <h2 class="verdana font-weight-bold">Alterar percentual de <br>
          todos os produtos.</h2>
      </div>
      <template #modal-footer>
        <div class="d-flex justify-content-center">
          <b-form-input
            v-model="newProfit"
            :placeholder="newProfit"
            value=""
            type="text"
            class="verdana font-weight-bold"
            @focus="setToZero"
          />
          <b-button
            variant="primary"
            class="verdana font-weight-bold text-white"
            @click="changeProfit"
          >
            Alterar
          </b-button>
        </div>
        <b-spinner
          v-if="loading"
          variant="primary"
          class="spinner"
          size="xl"
        />
      </template>
    </b-modal>
  </div>
</template>

<script>
import {
  BModal, BButton, BFormInput, BSpinner,
} from 'bootstrap-vue'
import management from '@/services/management/index'

export default {
  components: {
    BModal,
    BButton,
    BFormInput,
    BSpinner,
  },
  props: {
    profit: {
      type: Number,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    requisitionType: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    internal: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      newProfit: null,
    }
  },

  methods: {
    setToZero() {
      this.newProfit = ''
    },
    setInitialValue() {
      this.newProfit = `${this.profit}%`
    },
    changeProfit() {
      const user = localStorage.getItem('userId')

      if (this.requisitionType === 'create') {
        management.createMargin(this.code, Number(this.newProfit), Number(user), this.internal).then(() => {
          this.$emit('reloadTable')
        })
      } else {
        management.updateMargin(this.code, Number(this.newProfit), Number(user), this.internal).then(() => {
          this.$emit('reloadTable')
        })
      }
    },
  },
}
</script>

<style lang='scss' scoped>
#modal-2 {
  max-width: 100px;
}
h2 {
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
}
input {
  width: 82px;
  height: 39px;
  color: #c4c4c4;
  text-align: center;
}
button {
  width: 103px;
  height: 38px;
  margin-left: 11px;
  display: block;
  border-radius: 0;
}
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 50;
}
</style>
