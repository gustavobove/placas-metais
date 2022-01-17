export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
  },
  {
    path: '/recuperacao-de-senha',
    name: 'recuperacao-de-senha',
    component: () => import('@/views/auth/RecoveryPassword.vue'),

  },
]
