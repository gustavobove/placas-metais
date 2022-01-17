export default [
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import(/* webpackChunkName: "home" */ '@/views/orders/Orders.vue'),
    meta: {
      title: 'pedidos',
      menu: true,
      requiresAuth: true,
    },
  },
]
