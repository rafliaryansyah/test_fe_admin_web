import { Login, Main, NotFound } from '../pages';

// main routes here
const appRoutes = [
  {
    id: 11,
    title: 'Login',
    path: '/login',
    component: Login,
    exact: true
  },
  {
    id: 10,
    title: 'Profile',
    path: '/profile',
    component: Main,
    exact: true
  },
  {
    id: 9,
    title: 'Voucher',
    path: '/voucher',
    component: Main,
    exact: true
  },
  {
    id: 8,
    title: 'Category',
    path: '/category',
    component: Main,
    exact: true
  },
  {
    id: 7,
    title: 'Orders',
    path: '/orders',
    component: Main,
    exact: true
  },
  {
    id: 6,
    title: 'Detail Toko',
    path: '/toko/detail',
    component: Main,
    exact: true
  },
  {
    id: 5,
    title: 'Toko',
    path: '/toko',
    component: Main,
    exact: true
  },
  {
    id: 4,
    title: 'Detail Customer',
    path: '/customers/detail',
    component: Main,
    exact: true
  },
  {
    id: 3,
    title: 'Customers',
    path: '/customers',
    component: Main,
    exact: true
  },
  {
    id: 2,
    title: 'Dashboard',
    path: '/',
    component: Main,
    exact: true
  },
  {
    id: 1,
    title: 'Halaman tidak ditemukan',
    path: '*',
    component: NotFound,
    exact: true
  }
];

export { appRoutes };
