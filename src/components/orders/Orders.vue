<template>
  <div class="content bg-grey position-relative">
    <b-spinner
      v-if="loading"
      variant="primary"
      class="loading"
    />
    <b-container class="orders">
      <b-row class="pb-5">
        <b-col
          md="12"
          class="d-flex flex-column flex-xl-row justify-content-between align-items-center"
        >
          <h2 class="orders__page-title mb-0 text-left mb-4 mb-xl-0">
            Pedidos
          </h2>

          <div class="d-flex align-items-center">

            <div class="position-relative orders__search">
              <b-form-input
                v-model="searchValue"
                class="custom-input"
                @input="searchInTable"
              />
              <Search class="orders__search__icon" />
            </div>
            <button
              v-b-modal.modal-1
              class="mb-0 ml-3 mr-3 d-flex align-items-center verdana  orders__menu-buttons"
            >
              Filtrar
              <FilterIcon class="ml-2" />
            </button>
            <button
              class="mb-0 d-flex align-items-center verdana orders__menu-buttons"
              @click="downloadCSV"
            >
              Exportar
              <ExportIcon class="ml-2" />
            </button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <span
          v-if="filteredArray.length <= 0"
          class="text-center d-block mx-auto"
        >Nenhum item encontrado</span>
        <div class="">
          <span
            v-if="selectedStatus"
            class="filter"
            @click="cleanSelectedStatus"
          > {{ selectedStatus.status }} </span>
          <span
            v-if="selectedSupervisor"
            class="filter"
            @click="cleanSelectedSupervisor"
          > {{ selectedSupervisor.nome }} </span>
          <span
            v-if="initDate"
            class="filter"
            @click="cleanSelectedinitDate"
          > {{ initDate }} </span>
          <span
            v-if="endDate"
            class="filter"
            @click="cleanSelectedEndDate"
          > {{ endDate }} </span>
        </div>
        <b-table
          :items="filteredArray"
          :fields="fields"
          striped
          responsive
          variant="primary"
          sort-icon-left
          details-td-class="align-middle"
          :borderless="true"
          hover
          class="text-center"
          :filter="searchValue"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #cell(id)="row">
            <div class="light-item orders__row">
              {{ row.item.id }}
            </div>
          </template>
          <template #cell(supervisor)="row">
            <div>
              {{ row.item.supervisor.nome }}
            </div>
          </template>
          <template #cell(created_at)="row">
            <div class="">
              {{ getCorrectDate(row.item.created_at) }}
            </div>
          </template>
          <template #cell(pedido_status)="row">
            <div class="">
              {{ row.item.pedido_status ? row.item.pedido_status.status : 'Sem informações' }}
            </div>
          </template>
          <template #cell(produtos)="row">
            <div>
              <div>
                <span
                  v-for="(produto, index) in row.item.produtos"
                  :key="index"
                  class="d-block"
                > <span
                    v-if="produto.dados_adicionais"
                    class="d-block text-capitalize"
                    @click="downloadImage(produto)"
                  > {{ correctTitle(produto.dados_adicionais.tipo) }} <DownloadIcon />

                  </span>
                  <span v-if="produto.produto"> {{ produto.produto.Nome }}</span>
                </span>

              </div>
            </div>

          </template>
        </b-table>

      </b-row>
    </b-container>
    <b-modal
      id="modal-1"
      class="modal"
      size="lg"
      centered
    >
      <template #modal-header>
        <button
          class="ml-auto border-0 text-danger bg-light"
          @click="closeModal"
        >
          x
        </button>
      </template>
      <div class="modal-body-custom">

        <span class="d-flex align-items-center verdana font-weight-bold d-block mb-4"> Filtrar <FilterIcon class="ml-2" /></span>
        <div class="modal__inputs d-flex justify-content-between align-items-center">
          <div class="d-flex flex-column">
            <label
              for="supervisor"
              class="verdana"
            > Supervisor </label>
            <select
              id="supervisor"
              v-model="selectedSupervisor"
              name="supervisor"
            >
              <option
                v-for="(option, index) in supervisorsOptions"
                :key="index"
                :value="option"
              >
                {{ option.nome }}

              </option>
            </select>
          </div>

          <div class="d-flex flex-column">
            <label
              for="status"
              class="verdana"
            > Status </label>
            <select
              id="status"
              v-model="selectedStatus"
              name="status"
            >
              <option
                v-for="(option, index) in statusOptions"
                :key="index"
                :value="option"
              >
                {{ option.status }}
              </option>

            </select>
          </div>
          <div class="d-flex flex-column">
            <label
              for="Data pedido"
              class="verdana"
            > Data Início </label>
            <input
              v-model="initDate"
              type="date"
            >
          </div>
          <div class="d-flex flex-column">
            <label
              for="Data pedido"
              class="verdana"
            > Data Fim </label>
            <input
              v-model="endDate"
              type="date"
            >
          </div>

        </div>
      </div>
      <template
        #modal-footer
      >
        <div class="px-55 d-flex justify-content-between w-100 align-items-center">
          <button
            v-if="selectedSupervisor || selectedStatus || initDate || endDate"
            class="text-danger border-0 remove-filters"
            @click="removeFilters"
          >
            Remover filtros x
          </button>
          <BButton
            variant="primary"
            class="modal__footer-btn"
            @click="filterWithOptions"
          >
            Filtrar
          </BButton>

        </div>

      </template>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BContainer, BTable, BModal, BButton, BFormInput,
} from 'bootstrap-vue'

import Search from '@/assets/icons/Search.vue'
import FilterIcon from '@/assets/icons/Filter.vue'
import ExportIcon from '@/assets/icons/Export.vue'
import Orders from '@/services/orders/index'
import DownloadIcon from '@/assets/icons/Download.vue'

export default {
  components: {
    BRow, BCol, BContainer, Search, FilterIcon, ExportIcon, BTable, BModal, BButton, BFormInput, DownloadIcon,
  },
  data() {
    return {
      loading: false,
      statusOptions: [''],
      supervisorsOptions: [''],
      selectedSupervisor: '',
      selectedSupervisorId: null,
      selectedStatus: '',
      initDate: '',
      areThereFilters: false,
      filterOn: ['id', 'supervisor', 'pedido_status', 'created_at', 'produtos'],
      endDate: '',
      columns: [
        {
          key: 'pedido',
        },
      ],
      searchValue: '',
      optionData: 'Todos',
      optionSupervisor: 'Todos',
      optionRepresentante: 'Todos',
      optionStatus: 'Todos',
      filteredArray: [],
      items: [],
      fields: [
        {
          label: 'Pedido',
          key: 'id',
        },
        {
          label: 'Produtos',
          key: 'produtos',
        },
        {
          label: 'Supervisor',
          key: 'supervisor',
        },

        {
          label: 'Data Pedido',
          key: 'created_at',
        },
        {
          label: 'Status',
          key: 'pedido_status',
        },

      ],
    }
  },

  async created() {
    this.getStatusOptions()
    this.getSupervisors()
    this.getOrdersArray()
  },
  methods: {
    getRow(e) {
      console.log('row clicked', e)
      if (e.produtos) {
        console.log('e', e.produtos)
        window.open(e.produtos[0].imagem.url)
      }
    },
    downloadImage(produto) {
      if (produto.imagem) {
        window.open(produto.imagem.url, '_blank')
      } else {
        this.$bvToast.toast('Imagem não disponível', {
          title: 'Ocorreu um erro',
          variant: 'danger',
        })
      }
    },
    downloadCSV() {
      Orders.downloadOrders().then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.csv') // or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
    cleanSelectedStatus() {
      this.selectedStatus = null
      this.filterWithOptions()
    },
    cleanSelectedSupervisor() {
      this.selectedSupervisor = null
      this.filterWithOptions()
    },
    cleanSelectedinitDate() {
      this.initDate = ''
      this.filterWithOptions()
    },
    cleanSelectedEndDate() {
      this.endDate = ''
      this.filterWithOptions()
    },
    closeModal() {
      this.$bvModal.hide('modal-1')
      this.endDate = ''
      this.initDate = ''
      this.selectedSupervisor = ''
      this.selectedStatus = ''
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async getOrdersArray(filter) {
      this.loading = true
      const { data } = await Orders.getOrders(filter)
      this.loading = false
      this.items = data
      this.filteredArray = this.items
      this.$bvModal.hide('modal-1')
      console.log('filtered', this.filteredArray)
    },
    removeFilters() {
      this.endDate = ''
      this.selectedStatus = ''
      this.selectedSupervisor = ''
      this.initDate = ''
      this.areThereFilters = false
    },
    filterWithOptions() {
      const filters = {
        _limit: 20,
      }

      if (this.selectedSupervisor) {
        filters.supervisor_eq = this.selectedSupervisor.id
      }
      if (this.selectedStatus) {
        filters.pedido_status_eq = this.selectedStatus.id
      }
      if (this.initDate) {
        filters.created_at_gte = this.initDate
      }
      if (this.endDate) {
        filters.created_at_lte = this.endDate
      }

      this.getOrdersArray(filters)
    },
    async getStatusOptions() {
      const { data } = await Orders.getOrdersStatus()
      this.statusOptions = data
    },
    getSupervisorId(payload) {
      this.selectedSupervisorId = payload
    },
    async getSupervisors() {
      const { data } = await Orders.getSupervisores()
      this.supervisorsOptions = data
    },
    correctTitle(title) {
      const newTitle = title
      if (newTitle) {
        return newTitle.replace('-', ' ')
      }
      return newTitle
    },
    getCorrectDate(date) {
      const newDate = new Date(date).toLocaleString('pt-BR', {
        dateStyle: 'short',
      })
      return newDate
    },
    searchInTable() {
      // console.log('test12312313', this.items)
      // if (this.searchValue.length < 1) {
      //   this.filteredArray = this.items
      // } else {
      //   this.filteredArray = this.items.filter(item => item.supervisor.nome.includes(this.searchValue) || item.created_at.includes(this.searchValue) || item.pedido_status.status.includes(this.searchValue) || item.id.toString().includes(this.searchValue.toString())
      //   || item.produtos.map(produto => produto.Nome).filter(filtered => produto.includes(this.searchValue)))
      // }
    },

    setSupOption() {
      this.selectedFilters.supervisor = this.optionSupervisor
    },
    setRepOption() {
      this.selectedFilters.representante = this.optionRepresentante
    },
    setStatusOption() {
      this.selectedFilters.status = this.optionStatus
    },

    getStatusClass(status) {
      switch (status) {
        case 'Enviado':
          return 'sent'
        case 'Embalado':
          return 'packed'
        case 'Pagamento Pendente':
          return 'pending'
        case 'Cancelado':
          return 'canceled'
        default:
          return ''
      }
    },

  },
}
</script>

<style scoped lang='scss'>
@import '@/assets/scss/variables/_variables.scss';
legend {
  color: red!important;
}

.status {
  transition: none!important;
}
.orders {
  &__row {
    padding: 29px 0px;
    text-align: center;

  }
  &__search {
    height: 100%;
    input {
      height: 100%;
      padding-right: 32px;
    }
    &__icon {
      position: absolute;
      right: 6px;
      top: 6px;
      bottom: 0;
      margin: auto;
    }
  }
 &__menu-buttons {
   color: #000000;
   font-weight: 700;
   background-color: transparent;
   border: none;
   &:focus {
     outline: none;
   }
   &:hover {
     color: $blue;
   }
 }
 &__page-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: $blue;
  cursor: pointer;
 }
}

.content {
  min-height: calc(100vh - 85px);
  padding-top: 22px;
}
.input-group-text  {
  background-color: #fff;
}
.form-control {
&:focus {
    background-color: #fff;
    border-color: #dfe3e7!important;
    outline: #dfe3e7!important;
    box-shadow: none!important;
}
}

.items-font {
  font-size: 14px;
}

.modal {
  min-width: 720px;
  padding: 550px;
  &__inputs {
    input, select {
    width: 150px;
    height: 49px;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
    border-radius: 0px;
    padding: 0 10px;
    color: #C4C4C4;
    font-weight: 300;
    font-size: 12px;
    }
    label {
      font-size: 12px;
      line-height: 12px;
      color: #000000;
      font-family: 400;
    }
  }

  &__footer-btn {
    border-radius: 0;
    padding: 13px 34px;
  }
}

.order-title {
 font-family: Verdana;
font-style: normal;
font-weight: bold;
font-size: 15px;
color: #000000;
}

.remove-filters {
  background-color: #fff;
}
.filter {
  background-color:#eef3f6;
  color: #000;
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 12px;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
  &:after {
    content: '\2716';
    color: red;
  }
}
.loading {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10;
}

</style>
