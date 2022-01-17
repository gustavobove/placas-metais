<template>
  <div class="position-relative custom-container">
    <HamburgerIcon
      v-if="$route.name !== 'login' && $route.name !== 'home' "
      class="burger d-block d-lg-none"
      :active="burgerActive"
      @toggleNavbar="toggleNavbar"
    />
    <div
      class="navbar"
      :class="$route.name !== 'login' && $route.name !== 'home' ? 'navbar__static' : ''"
    >
      <router-link to="/">
        <img
          src="@/assets/images/logo.png"
          alt="Placas Metais logo"
          class="navbar__logo"
        >
      </router-link>
      <div
        v-if="$route.name !== 'login' && $route.name !== 'home' "
        class="d-flex align-items-center navbar__router"
      >
        <router-link
          to="/placas"
          class="router__link"
          @click.native="closeNav"
        >
          <PlacasIcon
            class="router__icon"
            :color="$route.name === 'placas' ? '#5B5B5B' : '#312C99'"
          />Placas
        </router-link>
        <router-link
          to="/produtos"
          class="router__link"
          @click.native="closeNav"
        >
          <BoxIcon
            :color="$route.name === 'produtos' ? '#5B5B5B' : '#312C99'"
            class="router__icon"
          /> Outros Produtos
        </router-link>
        <router-link
          to="/pedidos"
          class="router__link"
          @click.native="closeNav"
        >
          <Orders
            :color="$route.name === 'produtos' ? '#5B5B5B' : '#312C99'"
            class="router__icon"
          /> Pedidos
        </router-link>
        <div class="d-flex align-items-center mt-5 d-lg-none">
          <ShoppingCartIcon
            class="d-block mr-4 d-lg-none"
            :quantity="getCartQuantity"
            @click.native="closeNav"
            @openCartPage="$router.push('/carrinho')"
          />
          <UserIcon
            class="d-block d-lg-none"
            @click.native="closeNav"
          />
        </div>
      </div>
      <div v-if="$route.name === 'login' || $route.name === 'home' ">
        <BButton
          class="navbar___button text-white"
          variant="primary"
          to="/login"
        >
          Área do Parceiro
        </BButton>
      </div>
      <div v-if="$route.name !== 'login' && $route.name !== 'home' ">
        <ShoppingCartIcon
          class="mr-5 d-none d-lg-inline-block svg-responsive"
          :quantity="getCartQuantity"
          @openCartPage="$router.push('/carrinho')"
        />
        <UserIcon
          class="mr-5 d-none d-lg-inline-block svg-responsive"
          @click="$router.push('/profile')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { BButton } from 'bootstrap-vue'
import PlacasIcon from '@/assets/icons/Placas.vue'
import BoxIcon from '@/assets/icons/Box.vue'
import ShoppingCartIcon from '@/assets/icons/shoppingCart.vue'
import UserIcon from '@/assets/icons/User.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import Orders from '@/assets/icons/Orders.vue'

export default {
  components: {
    HamburgerIcon,
    BButton,
    PlacasIcon,
    BoxIcon,
    ShoppingCartIcon,
    UserIcon,
    Orders,
  },
  data() {
    return {
      navbarElement: '',
      burgerActive: false,

    }
  },
  computed: {
    getCartQuantity() {
      return this.$store.state.cart.shoppingCartItems ? Number(this.$store.state.cart.shoppingCartItems.length) : 0
    },
  },
  created() {
    this.navbarElement = document.querySelector('.navbar__router')
  },
  methods: {

    toggleNavbar() {
      const navbar = document.querySelector('.navbar__router')
      navbar.classList.toggle('active-navbar')
    },
    closeNav() {
      this.burgerActive = !this.burgerActive
      this.toggleNavbar()
    },
  },
}
</script>

<style lang='scss' scoped>
.custom-container {
  @media (min-width: 1200px) {
    padding: 0 130px;
  }
  @media (max-width: 1199.98px) {
    padding: 16px;
  }
}
.navbar {
  top: 25px;
  left: 0;
  position: absolute;
  width: 100%;
  margin: auto;
  padding: 0 130px;
  @media (max-width: 575.98px) {
    padding: 0 16px;
  }
  &__logo {
    cursor: pointer;
  }
  &__router {
    @media (max-width: 992.98px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 1);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: center;
      align-items: center;
      transform: translateX(100%);
    }
  }
  &__static {
    position: static;
    padding: 19px 0;
    @media (max-width: 1199.98px) {
      padding: 0;
    }
  }
  button {
    background: #312C99;
    border: none;
    color: #fff;
    font-size: 12px;
    min-width: 155px;
    padding: 10px 0px;
  }
}
.router {
  &__icon {

  }
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    color: #312C99;
    margin-right: 2.5rem;
    @media (max-width: 1199.98px) {
      margin-right: 1rem;
    }
    @media (max-width: 992.98px) {
      color: #fff;
      margin-top: 1rem;
    }
    &:hover {
      text-decoration: none;
      color: #5B5B5B;
    }
  }
  &__icon {
    margin-right: 4.5px;
     @media (max-width: 1199.98px) {
      margin-right: 1rem;
    }
  }

}.router-link-active {
  color: #5B5B5B;
}
.burger {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 99999999;
}
.active-navbar {
  transform: translateX(0%);
}

</style>
