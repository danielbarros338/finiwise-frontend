import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      // Sessão de ganhos
      { path: 'earning', component: () => import('pages/earning/IndexPage.vue') },
      { path: 'earning/earning-list', component: () => import('pages/earning/EarningPage.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue') },
      { path: 'register', component: () => import('pages/auth/SignUpPage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
