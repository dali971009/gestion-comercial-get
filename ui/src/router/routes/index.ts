import type { RouteRecordRaw } from 'vue-router';
import RouteNames from '../route-names';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'AuthLayout',
    component: () => import('../../layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: RouteNames.LOGIN,
        component: () => import('../../views/LoginView.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('../../layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: RouteNames.DASHBOARD,
        component: () => import('../../modules/dashboard/DashboardView.vue'),
        alias: [''],
      },
      {
        path: 'clients',
        name: RouteNames.CLIENT_LIST,
        component: () => import('../../modules/clients/ClientListView.vue'),
      },
      {
        path: 'clients/new',
        name: RouteNames.CLIENT_NEW,
        component: () => import('../../modules/clients/ClientDetailsView.vue'),
      },
      {
        path: 'clients/:id/edit',
        name: RouteNames.CLIENT_EDIT,
        component: () => import('../../modules/clients/ClientDetailsView.vue'),
      },
      {
        path: 'users',
        name: RouteNames.USER_LIST,
        component: () => import('../../modules/users/UserListView.vue'),
      },
      {
        path: 'users/new',
        name: RouteNames.USER_NEW,
        component: () => import('../../modules/users/UserDetailsView.vue'),
      },
      {
        path: 'users/:id/edit',
        name: RouteNames.USER_EDIT,
        component: () => import('../../modules/users/UserDetailsView.vue'),
      },
      {
        path: 'service-types',
        name: RouteNames.SERVICE_TYPE_LIST,
        component: () => import('../../modules/service-type/ServiceTypeListView.vue'),
      },
      {
        path: 'service-types/new',
        name: RouteNames.SERVICE_TYPE_NEW,
        component: () => import('../../modules/service-type/ServiceTypeDetailsView.vue'),
      },
      {
        path: 'service-types/:id/edit',
        name: RouteNames.SERVICE_TYPE_EDIT,
        component: () => import('../../modules/service-type/ServiceTypeDetailsView.vue'),
      },
      {
        path: 'services',
        name: RouteNames.SERVICE_LIST,
        component: () => import('../../modules/services/ServiceListView.vue'),
      },
      {
        path: 'contracts',
        name: RouteNames.CONTRACT_LIST,
        component: () => import('../../modules/contracts/ContractListView.vue'),
      },
      {
        path: 'invoices',
        name: RouteNames.INVOICE_LIST,
        component: () => import('../../modules/invoices/InvoiceListView.vue'),
      },
    ],
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../../views/AboutView.vue'),
  },
];

export default routes;
