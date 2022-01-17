export default [
  {
    path: '/placas',
    name: 'placas',
    component: () => import(/* webpackChunkName: "home" */ '@/views/placas/Placas.vue'),
    meta: {
      title: 'Placas',
      menu: true,
      requiresAuth: true,
    },
  },
]
