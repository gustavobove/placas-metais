export default [
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "home" */ '@/views/profile/Profile.vue'),
    meta: {
      title: 'profile',
      menu: true,
      requiresAuth: true,
    },
  },

]
