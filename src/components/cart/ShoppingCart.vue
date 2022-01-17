<template>
  <div>
    <div>

      <b-modal
        id="register-modal"
        hide-footer
      >
        <template #modal-title>
          Complete seu cadastro:
        </template>
        <div class="d-block text-center">
          <input
            v-model="cep"
            type="text"
            placeholder="CEP"
            @blur="getAddress"
          >
          <div class="d-flex">
            <input
              v-model="cidade"
              type="text"
              placeholder="Cidade"
            >
            <input
              v-model="uf"
              type="text"
              placeholder="UF"
              class="uf"
            >
          </div>
          <input
            v-model="logradouro"
            type="text"
            placeholder="Logradouro"
          >
          <input
            v-model="complemento"
            type="text"
            placeholder="Complemento"
          >
          <input
            v-model="bairro"
            type="text"
            placeholder="Bairro"
          >
          <input
            v-model="numero"
            type="text"
            placeholder="Número"
          >
        </div>
        <button
          class="btn-primary d-block mx-auto text-center border-0 py-2 px-3 mb-3"
          @click="updateRegister"
        >
          Atualizar
        </button>
      </b-modal>
    </div>
    <p
      v-if="!items.length"
      class="text-center"
    >
      Nenhum item no carrinho.
    </p>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="container"
    >

      <div class="item">
        <div class="d-flex flex-column flex-xl-row align-items-center">
          <div class="item__image">
            <img
              :src="item.image"
              alt=""
            >
          </div>
          <div class="item__infos h-100 d-flex flex-column justify-content-center align-items-center align-items-xl-start justify-content-lg-between align-self-xl-start">
            <h2 class="item__infos__title">
              {{ item.name }}
            </h2>
            <div
              v-if="productCheck(item)"
              class="plates__infos d-flex align-items-center my-2 my-xl-0"
            >
              <div>
                Quantidade de nomes: <span class="plates__value"> {{ item.namesQuantity }} </span>
              </div>
              <div>
                Linha adicional: <span class="plates__value"> {{ item.extraLine }} </span>
              </div>
              <div>
                Frase adicional: <span class="plates__value"> {{ item.extraQuote }} </span>
              </div>
              <div>
                Dimensões: <span class="plates__value"> {{ item.dimensions }} </span>
              </div>
            </div>
            <span
              class="item__delete"
              @click="deleteItem(index)"
            > Excluir item</span>
          </div>
        </div>
        <div class="item__inputs">
          <span @click="removeItem(index)"> - </span>
          <p class="item__inputs__qtd mb-0">
            {{ getItemQtd(index) }}
          </p>
          <span @click="addItem(index)"> + </span>
        </div>
        <div class="item__value">
          <p>R$ <span> {{ getTotal(item.quantity, item.price) }} </span></p>
        </div>

      </div>
      <div class="item__divider" />
    </div>
    <div
      v-if="!checkRegisterComplete"
      class=""
    >
      <p class="text-danger text-center">
        Complete seu endereço para prosseguir com a compra. <span
          class="text-primary link"
          @click="$bvModal.show('register-modal')"
        >Clique aqui</span>
      </p>

    </div>
    <div class="container d-flex justify-content-xl-end">
      <div class="register-data mb-2">
        <span class="">Dados de entrega:</span>
        <span class="d-block text-capitalize">{{ logradouro + ", " + numero + ", " + bairro }}</span>
        <span class="d-block text-capitalize"> {{ cidade + "/" + uf + " " + cep }}</span>
      </div>
    </div>

    <div class="container d-flex flex-column flex-xl-row align-items-center justify-content-end">

      <p class="item__total mb-0 mr-4">
        Total: <span class="item__total__value verdana">R$ <span> {{ getTotalValue }}</span></span>
      </p>

      <BButton
        class="item__buy"
        variant="primary"
        :disabled="!checkRegisterComplete"
        @click="checkout"
      >
        Concluir compra

      </BButton>
    </div>

    <b-spinner
      v-if="loading"
      class="d-block mx-auto mt-2 mt-xl-0"
      variant="primary"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { BButton, BSpinner } from 'bootstrap-vue'
import checkout from '@/services/checkout/index'
import userService from '@/services/register'
import getAddress from '@/services/cep'

export default {
  components: {
    BButton,
    BSpinner,
  },
  data() {
    return {
      items: [],
      userData: [],
      singleItemTotal: 0,
      loading: false,
      cep: '',
      cidade: '',
      uf: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      numero: '',
    }
  },
  computed: {
    getTotalValue() {
      return this.$store.state.cart.cartTotal
    },

    checkRegisterComplete() {
      return this.$store.state.user.completedRegister
    },

  },

  created() {
    this.getCartItems()
    this.setUpdateItem()
    this.checkRegister()
    this.getUserData()
  },
  // cep: '',
  //     cidade: '',
  //     uf: '',
  //     logradouro: '',
  //     complemento: '',
  //     bairro: '',
  //     numero: '',
  methods: {
    updateRegister() {
      const payload = {
        cep: this.cep,
        cidade: this.cidade,
        uf: this.uf,
        logradouro: this.logradouro,
        complemento: this.complemento,
        bairro: this.bairro,
        numero: this.numero,
      }
      this.$store.commit('user/SET_USERDATA', payload)
      if (this.cep && this.cidade && this.uf && this.logradouro && this.bairro && this.numero) {
        this.$store.commit('user/SET_COMPLETEDREGISTER', true)
        userService.updateData(payload)
      } else {
        this.$store.commit('user/SET_COMPLETEDREGISTER', false)
      }
    },
    async getAddress() {
      const { data } = await getAddress.getAddress(this.cep)

      this.bairro = data.bairro || ''
      this.logradouro = data.logradouro || ''
      this.uf = data.uf || ''
      this.cidade = data.localidade || ''
    },
    async getUserData() {
      const { data } = await userService.getUserData()
      this.userData = data
      this.cep = this.userData.cep
      this.cidade = this.userData.cidade
      this.uf = this.userData.uf
      this.logradouro = this.userData.logradouro
      this.complemento = this.userData.complemento
      this.bairro = this.userData.bairro
      this.numero = this.userData.numero
    },
    checkRegister() {
      const userData = this.$store.state.user.user
      if (userData.cidade && userData.cep && userData.uf && userData.logradouro && userData.bairro && userData.numero) {
        this.$store.commit('user/SET_COMPLETEDREGISTER', true)
      } else {
        this.$store.commit('user/SET_COMPLETEDREGISTER', false)
      }
    },
    ...mapActions(
      { setUpdateItemQtd: 'cart/setUpdateItemQtd', setUpdateItem: 'cart/updateItem' },
    ),
    ...mapMutations(
      { DELETE_ITEM: 'cart/DELETE_ITEM' },
    ),
    async checkout() {
      this.loading = true
      const produtos = []

      this.items.forEach(item => {
        const payload = {
          produto: item.id,
          quantidade: item.quantity,
          tipo: item.type || '',
          placa: item.dimensions || null,
          nomes: item.nomes || '',
          frases: item.frases || '',
          imagem: item.imagem || '',
        }

        produtos.push(payload)
      })

      await checkout.checkoutProducts(produtos).then(res => {
        this.$store.commit('cart/SET_CLEANCART')
        this.items = []
        const { data } = res
        setTimeout(() => {
          window.open(data.url, '_blank')
          this.loading = false
        }, 1000)
        console.log('res', res)
      }).catch(err => {
        console.log('erro', err)
        this.$bvToast.toast('Não foi possível realizar a sua compra.', {
          title: err.message,
          variant: 'danger',
        })
        this.loading = false
      })
    },
    productCheck(item) {
      if (item.dimensions) {
        return true
      }
      return false
    },
    addItem(index) {
      this.setUpdateItemQtd({ quantity: this.items[index].quantity + 1, index, operation: 'sum' })
    },
    removeItem(index) {
      if (this.items[index].quantity) {
        this.setUpdateItemQtd({ quantity: this.items[index].quantity - 1, index, operation: 'subtract' })
      }
    },
    getItemQtd(index) {
      const qtd = this.items[index].quantity
      return qtd
    },
    getTotal(qtd, price) {
      return qtd * price
    },
    getCartItems() {
      this.items = this.$store.state.cart.shoppingCartItems
      console.log('all items', this.items)
    },
    deleteItem(index) {
      this.DELETE_ITEM(index)
    },
  },
}
</script>

<style lang='scss' scoped>
@import "@/assets/scss/variables/_variables.scss";
.item {
  display: flex;
  max-width: 100%;
  justify-content: space-between;
  @media (max-width: 1199.98px) {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;
    max-width: initial;
    width: auto;

  }
  &__buy {
    border-radius: 0;
    padding: 13px 22px;
     @media (max-width: 1199.98px) {
        margin-top: 16px;
      }
  }
  &__delete {
    color: #c83e3e;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: #db4242;
    }
  }
  &__image {
    width: 100px;
    height: 85px;
    border: 1px solid #C4C4C4;
    margin-right: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1199.98px) {
      width: auto;
      height: auto;
      max-width: 250px;
      margin: auto;
    }
    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      margin: auto;
    }
  }
  &__infos {
    width: 500px;
    @media (max-width: 1199.98px) {
      width: auto;
    }
    &__title {
      font-weight: bold;
      font-size: 16px;
      color: #5B5B5B;
      max-width: 100%;
      overflow-wrap: break-word;
      @media (max-width: 1199.98px) {
        margin-top: 16px;
      }
      @media (max-width: 992.98px) {
        margin: 10px auto;
        display: block;
        width: 100%;
      }
    }
  }
  &__inputs {
    display: flex;
    align-self: center;
    height: 30px;
    align-items: center;
    justify-content: center;
    &__qtd, span {
      cursor: pointer;
      height: 100%;
      text-align: center;
      border: 1px solid #C4C4C4;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__qtd {
        width: 44px;
        font-weight: bold;
        color: $blue;
        cursor: initial!important;
      }
      span {
        cursor: pointer;
        width: 34px;
      }
  }
  &__value {
    margin-left: 44px;
    align-self: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 19px;
    color: $blue;
    width: 150px;
    p {
      margin-bottom: 0;
    }
    @media (max-width: 1199.98px) {
      margin-left: 0;
      margin-top: 16px;
    }
  }
  &__divider {
    width: 100%;
    height: 2px;
    background-color: #fff;
    display: block;
    margin: 35px 0px;
     @media (max-width: 1199.98px) {
        margin: 10px 0px;
        height: 4px;
        background-color: rgb(187, 187, 187);
      }
  }
  &__total {
    font-weight: bold;
    font-size: 18px;
    line-height: 19px;
    color: #C4C4C4;
    &__value {
      color: $blue;

    }
  }
}

.plates {
  &__infos {
    font-size: 11px;
    color: #9f9f9f;
    white-space: nowrap;
    @media (max-width: 575.98px) {
      flex-direction: column;
    }
  }
  &__value {
      font-size: 11px;
      color: #000;
      font-weight: 700;
      display: inline-block;
      margin: 0 2.5px;
      &:after {
        content: '|';
        font-weight: 100;
        display: inline-block;
        margin: 0 3px;
        @media (max-width: 575.98px) {
          display: none;
        }
      }
    }
}

.loading {
  position: absolute;
  bottom: 0; right: 0; left: 0; top: 0;
  margin: auto;
  z-index: 99;
}
.link {
  text-decoration: underline;
  cursor: pointer;
}
#register-modal {
  input {
    width: 100%;
    display: block;
    height: 40px;
    padding-left: 1rem;
    margin-bottom: 12px;
  }
  .modal-body {
    padding: 0!important;
  }
  .uf {
    width: 20%;
    margin-left: 12px;
  }
}
button {
  &:disabled {
    cursor: not-allowed;
  }
}
.register-data {
  font-size: 14px;
  color: #5B5B5B;
}
</style>
