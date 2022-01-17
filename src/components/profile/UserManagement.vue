<template>

  <div class="user-management">
    <div class="d-flex flex-xl-row flex-column align-items-center justify-content-between mb-5">
      <h2> Gerenciador </h2>
      <div class="position-relative">
        <BFormInput
          v-model="searchValue"
          @input="tableSearch"
          @keyup.delete="tableSearch('backspace')"
        />
        <SearchIcon
          class="user-management__icon"
        />
      </div>
    </div>
    <b-spinner
      v-if="loadingTable"
      variant="primary"
      class="d-block mx-auto"
    />
    <BTable
      v-else
      :items="filteredProducts"
      :fields="fields"
      responsive
      striped
      tbody-tr-class="custom-tr"
      :on-click-row="setProfit"
    >

      <template #cell(codigo)="row">
        {{ row.item.id }}
      </template>
      <template #cell(produto)="row">
        {{ row.item.Nome }}
      </template>
      <template #cell(custo)="row">
        {{ getCurrency(row.item.preco) }}
      </template>
      <template #cell(margem)="row">
        {{ getMargin(row.item) }}%
      </template>
      <template #cell(final)="row">
        {{ getFinalPrice(row.item) }}
      </template>
      <template #cell(edit)="row">
        <button
          v-if="isThereMargin(row.item)"
          class="user-management__edit verdana font-weight-bold"
          @click="setProfit(row.item.cliente_lucro_produto || 0, row.item.id, 'edit', row.item)"
        >
          Editar
        </button>
        <button
          v-else
          class="user-management__edit verdana font-weight-bold"
          @click="setProfit(row.item.cliente_lucro_produto || 0, row.item.id, 'create', row.item)"
        >
          Criar
        </button>
      </template>

    </btable>
    <Modal
      :profit="profit"
      :code="Number(code)"
      :requisition-type="requistionType"
      size="sm"
      :loading="loading"
      :internal="productInternalId"
      @reloadTable="getAllproducts"
    />
  </div>
</template>

<script>
import {
  BFormInput, BTable, BSpinner,
} from 'bootstrap-vue'
import SearchIcon from '@/assets/icons/Search.vue'
import Modal from './modal/UserManagementModal.vue'
import management from '@/services/management/index'

export default {
  components: {
    SearchIcon,
    BFormInput,
    BTable,
    Modal,
    BSpinner,
  },
  data() {
    return {
      requistionType: '',
      loading: false,
      profit: 0,
      code: '',
      products: [],
      productInternalId: null,
      filteredProducts: [],
      searchValue: '',
      loadingTable: false,
      fields: [
        { label: 'Código', key: 'codigo', tdClass: 'align-middle text-left' },
        {
          label: 'Produto', key: 'produto', tdClass: 'align-middle text-left verdana font-weight-bold product-td', thClass: 'text-left',
        },
        {
          label: 'Custo', key: 'custo', tdClass: 'text-center custom-td align-middle',
        },
        { label: 'Margem', key: 'margem', tdClass: 'text-center custom-td align-middle' },
        {
          label: 'Final', key: 'final', tdClass: 'text-center custom-td align-middle', thClass: 'text-center',
        },
        {
          label: '', key: 'edit', tdClass: 'text-left custom-td align-middle edit verdana font-weight-bold', thClass: 'text-left',
        },
      ],
    }
  },
  async created() {
    this.getAllproducts()
  },
  methods: {
    getMargin(payload) {
      if (payload['cliente-lucro-produto'].length > 0) {
        const margin = payload['cliente-lucro-produto'][0].margem_percentual
        return margin
      }
      return 0
    },
    isThereMargin(payload) {
      const margin = payload['cliente-lucro-produto']
      if (margin.length > 0) {
        return true
      }
      return false
    },
    async getAllproducts() {
      this.loading = true
      this.loadingTable = true
      const payload = 'preview'
      const products = await management.getProducts(payload)
      this.products = products.data
      this.filteredProducts = this.products

      this.loading = false
      this.loadingTable = false
    },

    setProfit(value, code, requistionType, item) {
      this.profit = value
      this.code = Number(code)
      this.requistionType = requistionType
      if (item['cliente-lucro-produto'].length > 0) {
        this.productInternalId = item['cliente-lucro-produto'][0].id
      }
      this.$bvModal.show('modal-2')
    },
    getCurrency(value) {
      if (value > 0) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      }
      return value
    },
    getFinalPrice(payload) {
      console.log('getFinalPrice', payload)
      if (payload['cliente-lucro-produto'].length > 0) {
        const price = (payload['cliente-lucro-produto'][0].margem_percentual * payload.preco) / 100 + payload.preco

        return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      }
      return payload.preco
    },
    tableSearch(payload) {
      this.filteredProducts = this.filteredProducts.filter(item => item.Nome.toLowerCase().includes(this.searchValue) || item.preco.toString().includes(this.searchValue))
      if (this.searchValue === '' || payload === 'backspace') {
        this.filteredProducts = this.products
      }
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables/_variables.scss';
.user-management {
  input {
    padding-right: 2.5rem;
  }
  h2 {

    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: $blue;
  }
  &__icon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: translateX(-1rem) translateY(6px);
  }
  &__edit {
  font-size: 14px;
  line-height: 16px;
  color: #B8A500;
  background-color: transparent;
  border: none;
  &:hover {
    color: #000;
  }
  &:focus {
    outline: none;

  }
  }
}

</style>
