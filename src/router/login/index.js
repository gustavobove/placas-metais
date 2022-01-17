export default [
  {
    path: '/login',
    name: 'auth',
    component: () => import(/* webpackChunkName: "home" */ '@/views/auth/Login.vue'),
    meta: {
      title: 'login',
      menu: true,
    },
  },
]
