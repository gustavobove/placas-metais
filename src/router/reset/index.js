export default [
  {
    path: '/redefinir-senha',
    name: 'redefinir-senha',
    component: () => import('@/views/password-reset/ResetPassword.vue'),
    meta: {
      title: 'Resetar senha',
      menu: false,
    },
  },
]
