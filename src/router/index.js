/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import useJwt from '@/auth/jwt/useJwt'
// routes
import auth from './auth'
import home from './home'
import placas from './placas/index'
import produtos from './products/index'
import shoppingcart from './cart/index'
import orders from './orders/index'
import profile from './profile/index'
import store from '@/store'
import passwordReset from './reset/index'

Vue.use(VueRouter)

const routes = [
  ...auth,
  ...home,
  ...placas,
  ...produtos,
  ...shoppingcart,
  ...orders,
  ...profile,
  ...passwordReset,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && store.state.auth.isUserLoggedIn()) {
    const isTokenValid = new Date(useJwt.decodeJwt().exp * 1000) > new Date()
    if (isTokenValid) {
      next()
    } else {
      localStorage.removeItem('accessToken')
      next({ path: '/login' })
    }
  }
  if (!to.matched.some(record => record.meta.requiresAuth) && store.state.auth.isUserLoggedIn()) {
    next({ path: '/placas' })
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.isUserLoggedIn()) {
    localStorage.removeItem('accessToken')
    next({ path: '/login' })
  }

  next()
})

export default router
