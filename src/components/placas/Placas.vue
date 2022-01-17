<template>
  <div class="container position-relative">
    <b-spinner
      v-if="loading"
      class="loading"
      variant="primary"
    />
    <b-row class="py-5">
      <b-col
        lg="7"
        class="px-xl-5"
      >
        <div class="placas">
          <h2 class="placas__page-title">
            Placa para Cemitério Personalizada
          </h2>
          <div class="d-flex flex-column flex-md-row align-items-center placas__materials">
            <p class="placas__info-title">
              Material: <span class="placas__info-item"> Aço Inox </span>
            </p>
            <span class="mx-1 bar d-inline-block">|</span>
            <p class="placas__info-title">
              Indicado para: <span class="placas__info-item"> Lápides de cemitério e túmulos </span>
            </p>
          </div>
        </div>
        <div
          v-if="items"
          class="w-100"
        >
          <Item
            v-for="(item, index) in items"
            :key="index"
            :item-index="index"
            @removeItem="removeItem"
          />
        </div>
        <div>
          <AddQuote
            v-for="(item, index) in frases"
            :key="index"
            :item-index="index"
            @removeQuote="removeQuote"
          />
        </div>
        <b-button
          class="placas__add-name"
          :disabled="items.length > 5 || maxLengthReached"
          variant="primary"
          @click="addName"
        >
          Adicionar Nome
        </b-button>
        <b-button
          class="placas__add-name mt-3"
          variant="primary"
          :disabled="maxLengthReached"
          @click="addQuote"
        >
          Adicionar Frase
        </b-button>
      </b-col>
      <b-col
        lg="5"
        class="mt-4 mt-md-0"
      >
        <Placa
          @maxLines="maxLines"
          @totalNames="setTotalName"
          @totalLines="setTotalLines"
          @dimension="setDimension"
          @price="setPrice"
        />
        <div class="d-flex flex-md-row flex-column justify-content-end">
          <b-button
            class="placas__action-button"
            :disabled="maxLinesLimit ? true : false || maxLengthReached"
            @click="addToCart"
          >
            Adicionar ao carrinho
          </b-button>
          <b-button
            class="placas__action-button mt-2 mt-md-0"
            :disabled="maxLinesLimit ? true : false || maxLengthReached"
            @click="checkout"
          >
            Concluir Compra
          </b-button>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {
  BCol, BRow, BButton, BSpinner,
} from 'bootstrap-vue'
import { mapActions, mapMutations } from 'vuex'

import Item from './Item/AddName.vue'
import Placa from './Item/Placa.vue'
import AddQuote from './Item/AddQuote.vue'
import Checkout from '@/services/checkout/index'

export default {
  name: 'Placas',
  components: {
    Item,
    BCol,
    BRow,
    BButton,
    Placa,
    AddQuote,
    BSpinner,
  },
  data() {
    return {
      items: [],
      frases: [],
      maxLinesLimit: false,
      namesLength: null,
      linesLength: null,
      dimension: null,
      price: null,
      cleanArray: false,
      placaNome: '',
      loading: false,

    }
  },
  computed: {
    maxLengthReached() {
      const lines = this.$store.state.placas.dimensions
      if (lines > 12) {
        this.$bvToast.toast('O número máximo de linhas é: 12', {
          title: 'Número máximo de linhas atintigido.',
          variant: 'warning',

        })
        return true
      }
      return false
    },
    cleanInputStatus() {
      return this.$store.state.placas.cleanInputs
    },
  },
  watch: {
    cleanInputStatus() {
      this.items = []
      this.frases = []
    },
  },

  methods: {
    ...mapActions({ setShoppingCartItem: 'cart/setShoppingCartItem' }),
    ...mapMutations({ SET_IMAGE_STATUS: 'cart/SET_IMAGE_STATUS' }),
    addName() {
      this.items.push('')
    },
    checkout() {
      this.$store.commit('placas/SET_PRINT')
      const base64Image = this.$store.state.cart.image
      const userId = localStorage.getItem('userId')
      const payload = {
        usuario: userId,
        produtos: [
          {
            quantidade: 1,
            placa: this.$store.state.placas.placaSize,
            nomes: this.$store.state.placas.nomes,
            frases: this.$store.state.placas.frases,
            tipo: 'placa-personalizada',
            imagem: base64Image,
          },

        ],
      }

      Checkout.checkout(payload).then(res => {
        const { url } = res.data
        setTimeout(() => {
          window.open(url, '_blank')
        }, 1000)
      })
    },
    setTotalName(payload) {
      this.namesLength = payload
    },
    setDimension(payload) {
      this.dimension = payload
    },
    setTotalLines(payload) {
      this.linesLength = payload
    },
    setPrice(payload) {
      this.price = payload
    },
    removeItem(payload) {
      this.items.splice(payload, 1)
    },
    removeQuote(payload) {
      this.frases.splice(payload, 1)
    },
    maxLines(payload) {
      this.maxLinesLimit = payload
    },
    addQuote() {
      this.frases.push('')
    },
    addToCart() {
      this.$store.commit('placas/SET_PRINT')
      this.SET_IMAGE_STATUS(true)
      const base64Image = this.$store.state.cart.image
      this.setShoppingCartItem({
        name: 'Placa personalizada',
        quantity: 1,
        namesQuantity: this.namesLength,
        extraLine: this.linesLength,
        extraQuote: this.$store.state.placas.frases.length ? 'Sim' : 'Não',
        dimensions: this.dimension,
        price: this.price,
        image: '',
        type: 'placa-personalizada',
        nomes: this.$store.state.placas.nomes,
        frases: this.$store.state.placas.frases,
        imagem: base64Image,
      })
      this.loading = true
      setTimeout(() => {
        this.$store.commit('placas/SET_NONAMES')
        this.$store.commit('placas/SET_NOQUOTES')
        this.$store.commit('placas/SET_CLEANINPUTS', true)
        this.loading = false
      }, 2000)

      this.$bvToast.toast('Adicionado ao carrinho.', {
        title: 'Seu produto foi adicionado com sucesso.',
        variant: 'primary',

      })
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables/_variables.scss';
.placas {
  &__materials {
    overflow-wrap: break-word;
  }
  &__page-title {
    color: $blue;
    font-family: Verdana;
    font-weight: bold;
    font-size: 22px;
    line-height: 19px;
    @media (max-width: 1199.98px) {
      line-height: 22px;
    }
    @media (max-width: 992.98px) {
      margin-top: 32px;
    }
  }
  &__info-title {
    white-space: nowrap;
    color: #5B5B5B;
    margin-top: 16px;
    font-size: 13px;
    @media (max-width: 1199.98px) {
      margin-right: 16px;
    }
    @media (max-width: 767.98px) {
      margin: 0;
      &:nth-child(1) {
        margin-top: 16px;
      }

    }
  }
  &__info-item {
    font-weight: bold;
    font-size: 13px;
  }
  &__add-name {
    background: #F8F8F8;
    border: 1px dashed #C4C4C4;
    color: #5B5B5B;
    text-align: center;
    width: 100%;
    padding: 15px 0;
    @media (max-width: 1199.98px) {
      margin-top: 32px;
    }
  }
  &__action-button {
    border: 1px solid #000000;
    padding: 15.35px 16.53px;
    border: none;
    border-radius: 0;
    transition: .3s ease-in-out all;
    @media (max-width: 1199.98px) {
      width: 100%;
    }
    &:nth-child(1) {
      background-color: #fff;
      color: #000;
      border: 1px solid #000;
      margin-right: 10px;
      &:hover {
        background-color: $blue;
        color: #fff;
      }
    }
     &:nth-child(2) {
       background-color: $blue;
       color: #fff;
       &:hover {
         filter: brightness(80%);
       }
     }
  }
}
.bar {
  display: inline-block;
  @media (max-width: 1199.98px) {
    display: none!important;
  }
}
.loading {
  position: absolute;
  right: 0;
  top: 10px;
}
</style>
