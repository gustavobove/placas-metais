<template>
  <div class="bg-grey content">
    <div
      v-if="loadingCheckout"
      class="loading-content"
    >
      <b-spinner

        variant="primary"
        class="loading"
      />
    </div>
    <div class="container product-single">
      <b-row class="justify-content-center">
        <b-col
          xl="1"
          lg="12"
        >
          <a
            class="product-single__return"
            @click="$router.go(-1)"
          >
            Voltar
          </a>
        </b-col>
        <b-col
          xl="11"
          lg="12"
          class="product-single__content"
        >
          <div class="d-flex flex-column flex-xl-row justify-content-center justify-content-xl-start">
            <div class="product-single__gallery">
              <div class="product-single__gallery__main">

                <Lottie
                  v-if="loading"
                  :options="defaultOptions"
                />
                <img
                  v-else
                  :src="defaultImg.url"
                  alt=""
                >

              </div>
              <div class="product-single__gallery__thumbnails pb-0 position-relative">
                <div
                  v-for="(image, index) in productImages"
                  :key="index"
                  class="img-wrapper"
                  :class="galleryImgActive === index ? 'active' : ''"
                >
                  <img

                    :src="image.url"
                    class="product-single__image"

                    @click="activeImage(index)"
                  >
                </div>

              </div>
            </div>
            <div class="product-single__infos">
              <h2 class="product-single__infos__name">
                {{ name }}
              </h2>
              <div class="product-single__infos__qtd">
                <label for="qtd"> Quantidade </label>
                <div class="product-single__infos__qtd-wrapper">
                  <BButton
                    variant="primary"
                    class="product-single__infos__button"
                    :disabled="productQtd <= 0"
                    @click="decrease"
                  >
                    -
                  </BButton>
                  <b-form-input
                    id="qtd"
                    v-model.number="productQtd"
                    number
                    :value="productQtd"
                  />
                  <BButton
                    variant="primary"
                    class="product-single__infos__button"
                    @click="increase"
                  >
                    +
                  </BButton>
                </div>
              </div>
              <div class="product-single__total">
                <p class="product-single__total__price">
                  Total: <span class="roduct-single__price-value">R$</span> <span class="product-single__price-value">{{ preco * productQtd }},00</span>
                </p>
                <div class="">
                  <b-button
                    class="product-single__add-to-cart"
                    variant="primary"
                    @click="addToCart"
                  >
                    Adicionar ao carrinho
                  </b-button>
                  <b-button
                    class="product-single__buy"
                    variant="primary"
                    @click="checkout"
                  >
                    Concluir compra
                  </b-button>
                </div>
                <div class="d-flex justify-content-end position-relative">
                  <img
                    :src="require(`@/assets/images/pagseguro.png`)"
                    alt="Pagseguro"
                    class="product-single__pagseguro"
                  >
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          md="11"
          offset-xl="1"
        >
          <h3 class="product-single__info-title">
            Descrição
          </h3>
          <p class="product-single__description">
            {{ descricao }}
          </p>
          <h4 class="product-single__info-title-normal">
            Outras características
          </h4>
          <div class="">
            <p class="product-single__characteristics">
              Medidas
            </p>
            <span class="product-single__detail">{{ medidas }}</span>
          </div>
          <div class="">
            <p class="product-single__characteristics">
              Material
            </p>
            <span class="product-single__detail">{{ material }}</span>
          </div>
          <div class="">
            <p class="product-single__characteristics">
              Indicado
            </p>
            <span class="product-single__detail"> {{ indicado }} </span>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-modal
      id="warning-modal"
      title="Atenção"
    >
      <p class="my-4">
        O número de produtos selecionados é maior do que o número de produtos em estoque. Entraremos em contato.
      </p>
      <template #modal-footer>
        <button
          class="btn btn-primary"
          @click="hideModal()"
        >
          Entedido
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BButton, BFormInput, BSpinner } from 'bootstrap-vue'
import { mapActions } from 'vuex'
import Lottie from 'vue-lottie'
import services from '@/services/products'
import lottieAnimation from '@/assets/lottie/66420-scan-image-animation.json'
import checkoutProducts from '@/services/checkout/index'

export default {
  components: {
    BButton,
    BFormInput,
    BSpinner,
    Lottie,
  },
  filters: {
    typeNumber(value) {
      return Number(value)
    },
  },
  data() {
    return {
      productId: '',
      loadingCheckout: false,
      product: '',
      productQtd: 1,
      productImages: [],
      defaultImg: '',
      galleryImgActive: 0,
      name: '',
      preco: null,
      descricao: '',
      medidas: '',
      material: '',
      indicado: '',
      loading: false,
      defaultOptions: { animationData: lottieAnimation },
    }
  },
  watch: {
    productQtd() {
      this.productQtd = this.productQtd || 0
    },
  },

  async created() {
    this.loading = true
    this.productId = Number(this.$route.params.id)
    const token = localStorage.getItem('accessToken')
    await services.getProducts(token).then(res => {
      this.product = res.data.filter(product => product.id === this.productId)
      this.name = this.product[0].Nome
      this.preco = this.product[0].preco
      this.descricao = this.product[0].Descricao
      this.material = this.product[0].Material
      this.medidas = this.product[0].Medidas
      this.indicado = this.product[0].Indicado
      this.galleryImgActive = null
      this.getProductImages()
      this.loading = false
    })
  },

  methods: {
    hideModal() {
      this.$bvModal.hide('warning-modal')
    },
    ...mapActions({ setShoppingCartItem: 'cart/setShoppingCartItem' }),
    addToCart() {
      const estoque = this.product[0].estoque || 0
      if (this.productQtd > estoque) {
        this.$bvModal.show('warning-modal')
      }
      const item = {
        category: this.product[0].categorias_de_produto.nome,
        id: this.product[0].id,
        name: this.name,
        price: this.preco,
        quantity: this.productQtd,
        image: this.product[0].foto_capa.url,

      }
      this.setShoppingCartItem(item)
      this.$bvToast.toast('Adicionado ao carrinho.', {
        title: 'Seu produto foi adicionado com sucesso.',
        variant: 'primary',

      })
    },
    checkout() {
      this.loadingCheckout = true
      const product = {
        id: this.product[0].id,
        quantidade: this.productQtd,
      }
      const payload = []
      payload.push(product)

      checkoutProducts.checkoutProducts(payload).then(res => {
        const { data } = res
        setTimeout(() => {
          this.loadingCheckout = false
          window.open(data.url, '_blank')
        }, 1000)
      })
    },
    decrease() {
      this.productQtd -= 1
    },
    increase() {
      this.productQtd += 1
    },
    getProductImages() {
      this.defaultImg = this.product[0].foto_capa
      this.productImages = this.product[0].fotos
    },
    activeImage(index) {
      this.defaultImg = this.productImages[index]
      this.galleryImgActive = index
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables/_variables.scss';
$maxWidth: 364px;
.content {
  min-height: 100vh;
}
.product-single {
  padding-top: 32px;

  &__return {
    font-weight: bold;
    color: $blue;
    cursor: pointer;
  }
  &__gallery {
    &__main {
      border: 1px solid #C4C4C4;
      max-width: $maxWidth;
      margin-bottom: 8px;
      background-color: #fff;
      height: 300px;
      @media (max-width: 1199.98px) {
        margin: auto;
        max-width: initial;
        width: 500px;
        height: 300px;
      }
      @media (max-width: 767.98px) {
        width: auto;
      }
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      object-fit: cover;
    }
    }
    &__thumbnails {
      width: $maxWidth;
      display: flex;
      column-gap: 8px;
      justify-content: space-between;
      background-color: #fff;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      padding-bottom: 1rem;
      @media (max-width: 1199.98px) {
        width: 498px;
        margin: auto;

      }
      @media (max-width: 575.98px) {
        margin: 10px auto;
        width: 100%;
      }
      img {
        width: 100%;
        height: 57px;
        object-fit: cover;
        cursor: pointer;
        border: 1px solid #C4C4C4;
        padding-bottom: 0;
        @media (max-width: 1199.98px) {
          height: 100px;
        }
      }
    }
  }
  &__infos {
    padding-left: 29px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 1199.98px) {
        margin: auto;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-left: 0;
      }
    &__name {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: $blue;
    padding-top: 10px;

    }
    &__qtd-wrapper {
      display: flex;
      align-items: center;
      input {
        width: 44px;
        height: 32px;
        border-radius: 0;
        border: 1px solid #C4C4C4;
        padding: 0;
        text-align: center;
      }
    }
    &__button {
      border: 1px solid #C4C4C4;
      border-radius: 0;
      width: 44px;
      height: 32px;
      background-color: #fff;
      color: #C4C4C4;
      padding: 0;
      @media (max-width: 1199.98px) {
        margin: auto;
        width: 100%;
      }
    }
  }
  &__total {
    &__price {
      font-family: $vnormal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #C4C4C4;
      @media (max-width: 1199.98px) {
        text-align: center;
        padding: 16px 0px;
      }
    }
  }
    &__add-to-cart {
      background: #FFFFFF;
      border: 1px solid #000000;
      color: #000;
      margin-right: 8px;
      transition: .2s ease-in-out background-color;
      &:hover {
        background-color: $blue;
        color: #fff;
      }
    }
    &__add-to-cart, &__buy {
      border-radius: 0;
      padding: 20px 22px;
      font-size: 16px;
      line-height: 12px;
      text-align: center;
      @media (max-width: 1199.98px) {
        width: 100%;
        margin: 8px 0px;
      }

    }
    &__price-value {
      color: $blue;
      font-weight: $vbold;
      font-weight: 900;
    }
    &__characteristics {
      color: #c4c4c4;
      margin-bottom: 0;
    }
    &__detail {
      color: #000;
      margin-bottom: 1rem;
      display: block;
    }
    &__info-title {
      color: $blue;
      font-weight: 700;
      margin-top: 24px;
      letter-spacing: -1px;
    }
    &__description {
      font-family: Verdana;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: #000000;
      max-width:  calc(50px + #{$maxWidth})
    }
    &__info-title-normal {
      color: $blue;
      margin-top: 25px;
    }
    &__pagseguro {
      position: absolute;
      bottom: 0;
      transform: translateY(200%);
    }
}
::-webkit-scrollbar {
      width: 5px;
      height: 7px!important;
  }
  .img-wrapper {
     position: relative;
     transition: .2s ease all;
     min-width: 100px;
  }.active {
    transition: .2s ease all;
    &:after {
      content: '';
      transition: .2s ease all;
      width: 100%;
      height: 100%;
      opacity: .2;
      background-color: transparent;
      border: solid 3px $blue;
      display: block;
      position: absolute;
      top: 0;
      animation: active .3s ease-in-out forwards;
    }
  }
@keyframes active {
    from {
      opacity: 0;
    }
    to {
      opacity: .8;
    }
}
.loading-content {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  opacity: .5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
  .loading {
    width: 100px;
    height: 100px;
  }
}
</style>
