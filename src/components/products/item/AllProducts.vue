<template>
  <div>
    <div class="products">
      <p
        v-if="filteredProducts.length <= 0 && loading === false"
        class="text-center"
      >
        Nenhum produto encontrado.
      </p>
      <b-row class="justify-content-center flex-column flex-lg-row">
        <b-col md="1">
          <b-dropdown
            text="Categorias"
            variant="primary"
            class="d-block d-lg-none"
          >
            <b-dropdown-item @click="loadAllProducts">
              Todos
            </b-dropdown-item>
            <b-dropdown-item @click="loadCrucifixes">
              Crucifixos
            </b-dropdown-item>
            <b-dropdown-item @click="loadFlowers">
              Flores
            </b-dropdown-item>
            <b-dropdown-item
              @click="
                loadSculptures"
            > Esculturas</b-dropdown-item>
            <b-dropdown-item @click="loadVases">
              Vasos
            </b-dropdown-item>
          </b-dropdown>
          <ul class="list-unstyled products__menu d-none d-lg-block">
            <li
              :class="activeNav === 'all' ? 'active' : ''"
              @click="loadAllProducts"
            >
              Todas
            </li>
            <li
              :class="activeNav === 'crucifixes' ? 'active' : ''"
              @click="loadCrucifixes"
            >
              Crucifixos
            </li>
            <li
              :class="activeNav === 'sculptures' ? 'active' : ''"
              @click="
                loadSculptures"
            > Esculturas </li>
            <li
              :class="activeNav === 'flowers' ? 'active' : ''"
              @click="loadFlowers"
            >
              Flores
            </li>
            <li
              :class="activeNav === 'vases' ? 'active' : ''"
              @click="loadVases"
            >
              Vasos
            </li>
          </ul>
        </b-col>
        <b-col
          md="11"
          class="products__grid position-relative"
        >
          <BSpinner
            v-if="loading"
            variant="primary"
            class="loading"
          />
          <div
            v-for="(product, index) in filteredProducts.slice(
              (currentPage - 1) * perPage,
              currentPage * perPage
            )"
            :key="index"
            class="item"
            @click="goToProductPage(product.id, product.nome)"
          >

            <div
              v-if="product.foto_capa.url"
              class="item__image"
            >
              <img :src="product.foto_capa.url">

            </div>
            <hr>
            <div class="item__name">
              {{ product.Nome }}
            </div>
            <div class="item__price">
              {{ getFinalPrice(product) }}
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row
      v-if="filteredProducts.length"
      class="justify-content-center pt-3"
    >
      <b-pagination
        v-model="currentPage"
        :total-rows="products.length"
        :per-page="perPage"
        aria-controls="my-list"
      />
    </b-row>
  </div>
</template>

<script>
import {
  BCol, BRow, BPagination, BDropdown, BDropdownItem, BSpinner,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import services from '@/services/products/index'

export default {
  components: {
    BCol, BRow, BPagination, BDropdown, BDropdownItem, BSpinner,
  },
  data() {
    return {
      products: '',
      active: false,
      currentPage: 1,
      perPage: 8,
      activeNav: '',
      filteredProducts: [],
      noProducts: false,
    }
  },

  created() {
    this.loadAllProducts()
    this.getProducts()
  },
  beforeDestroy() {
    this.$store.commit('products/setProducts', this.products)
  },
  methods: {
    ...mapGetters({
      productsGetter: 'products/productsGetter',
    }),
    getFinalPrice(payload) {
      if (payload['cliente-lucro-produto'].length > 0) {
        const price = (payload['cliente-lucro-produto'][0].margem_percentual * payload.preco) / 100 + payload.preco

        return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      }
      return payload.preco
    },
    async getProducts() {
      this.loading = true
      const token = localStorage.getItem('accessToken')
      const products = await services.getProducts(token)
      this.products = products.data
      this.loadAllProducts()
      this.loading = false
      console.log('products', this.products)
    },
    goToProductPage(id) {
      this.$router.push(`/produtos/${id}`)
    },
    loadAllProducts() {
      this.filteredProducts = this.products
      this.activeNav = 'all'
    },
    loadCrucifixes() {
      this.filteredProducts = this.products.filter(product => product.categorias_de_produto.nome === 'crucifixos')
      this.activeNav = 'crucifixes'
    },
    loadSculptures() {
      this.filteredProducts = this.products.filter(product => product.categorias_de_produto.nome === 'esculturas')
      this.activeNav = 'sculptures'
    },
    loadFlowers() {
      this.filteredProducts = this.products.filter(product => product.categorias_de_produto.nome === 'flores')
      this.activeNav = 'flowers'
    },
    loadVases() {
      this.filteredProducts = this.products.filter(product => product.categorias_de_produto.nome === 'vasos')
      this.activeNav = 'vases'
    },
  },
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/variables/_variables';
.item {
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 320px;
  cursor: pointer;
  transition: .3s ease-in-out all;
  @media (max-width: 575.98px) {
      height: auto;
    }
  &:hover {
    box-shadow: 0px 0px 12px 0px rgba($blue, .35);
  }
  &__image {
  padding: 13px;
  height: 150px;
  @media (max-width: 767.98px) {
    height: auto;
  }
    img {
      max-width: 100%;
      display: block;
      margin: auto;
      object-fit: cover;
    }
  }
  &__name {
  padding: 13px;
  margin-top: 14px;
  font-family: Verdana;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  max-width: 90%;
  margin-bottom: 2rem;
  margin-top: 1rem;
  }
  &__price {
    padding: 13px;
    font-weight: bold;
  }
}

.products {
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 226px);
    row-gap: 22px;
    column-gap: 19px;
    padding-left: 2rem;
    @media (max-width: 992.98px) {
      margin-top: 2rem;
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 575.98px) {
      margin-top: 2rem;
      grid-template-columns: 1fr;
    }
  }
  &__menu {
    display: inline-block;
    padding-top: 4rem;
    li {
      text-align: right;
      font-weight: bold;
      font-size: 14px;
      line-height: 12px;
      color: #5B5B5B;
      margin-bottom: 1.5rem;
      cursor: pointer;
      &:hover {
        color: $blue;
      }
    }.active {
      color: $blue;
    }
  }
}

.loading {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
