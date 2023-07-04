import {createRouter, createWebHistory} from 'vue-router'
import {RouteNames} from '@/router/route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'AuthLayout',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: RouteNames.LOGIN,
          component: () => import('@/views/LoginView.vue'),
        }
      ]
    },
    {
      path: '/',
      name: 'MainLayout',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: RouteNames.DASHBOARD,
          component: () => import('@/modules/dashboard/DashboardView.vue'),
        },
        {
          path: 'clients',
          name: RouteNames.CLIENT_LIST,
          component: () => import('@/modules/clients/ClientListView.vue'),
        },
        {
          path: 'clients/new',
          name: RouteNames.CLIENT_NEW,
          component: () => import('@/modules/clients/ClientDetailsView.vue')
        },
        {
          path: 'clients/:client_code/edit',
          name: RouteNames.CLIENT_EDIT,
          component: () => import('@/modules/clients/ClientDetailsView.vue')
        },
        {
          path: 'services',
          name: RouteNames.SERVICE_LIST,
          component: () => import('@/modules/services/ServiceListView.vue')
        },
        {
          path: 'contracts',
          name: RouteNames.CONTRACT_LIST,
          component: () => import('@/modules/contracts/ContractListView.vue')
        },
        {
          path: 'invoices',
          name: RouteNames.INVOICE_LIST,
          component: () => import('@/modules/invoices/InvoiceListView.vue')
        },
      ],
    },


    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
