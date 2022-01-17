export default [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      title: 'home',
      menu: true,
    },
  },
]
