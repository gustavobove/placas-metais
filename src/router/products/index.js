export default [
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import(/* webpackChunkName: "home" */ '@/views/produtos/Produtos.vue'),
    meta: {
      title: 'produtos',
      menu: true,
      requiresAuth: true,
    },
  },
  {
    path: '/produtos/:id/',
    component: () => import('@/components/products/ProductSingle.vue'),
    meta: {
      title: 'single',
      menu: true,
      requiresAuth: true,
    },
  },
]
