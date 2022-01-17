export default [
  {
    path: '/carrinho',
    name: 'carrinho',
    component: () => import(/* webpackChunkName: "home" */ '@/views/cart/ShoppingCart.vue'),
    meta: {
      title: 'carrinho',
      menu: true,
      requiresAuth: true,
    },
  },
]
