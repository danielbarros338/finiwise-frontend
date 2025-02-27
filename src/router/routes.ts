import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      // Sessão de ganhos
      { path: 'earnings', component: () => import('pages/earnings/IndexPage.vue') },
      { path: 'earnings/earning-list', component: () => import('pages/earnings/EarningsPage.vue') },

      // Sessão de despesas
      { path: 'revenues', component: () => import('pages/revenues/IndexPage.vue') },
      {
        path: 'revenues/revenues-list',
        component: () => import('pages/revenues/RevenuesPage.vue'),
      },
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
