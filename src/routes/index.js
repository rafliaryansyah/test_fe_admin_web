import { Login, Main, NotFound } from 'pages';

// main routes here
const appRoutes = [
  {
    id: 21,
    title: 'Login',
    path: '/login',
    component: Login,
    exact: true
  },
  {
    id: 20,
    title: 'Profile',
    path: '/profile',
    component: Main,
    exact: true
  },
  {
    id: 19,
    title: 'Produk Terkait',
    path: '/produk-terkait',
    component: Main,
    exact: true
  },
  {
    id: 18,
    title: 'Promo',
    path: '/promo',
    component: Main,
    exact: true
  },
  {
    id: 17,
    title: 'Banner',
    path: '/banner/mini',
    component: Main,
    exact: true
  },
  {
    id: 16,
    title: 'Banner',
    path: '/banner/highlight',
    component: Main,
    exact: true
  },
  {
    id: 15,
    title: 'Banner',
    path: '/banner/main',
    component: Main,
    exact: true
  },
  {
    id: 14,
    title: 'User Logs',
    path: '/user-logs',
    component: Main,
    exact: true
  },
  {
    id: 13,
    title: 'Voucher',
    path: '/voucher',
    component: Main,
    exact: true
  },
  {
    id: 12,
    title: 'Category',
    path: '/category/jasa',
    component: Main,
    exact: true
  },
  {
    id: 11,
    title: 'Category',
    path: '/category/produk',
    component: Main,
    exact: true
  },
  {
    id: 10,
    title: 'Category',
    path: '/category',
    component: Main,
    exact: true
  },
  {
    id: 9,
    title: 'Report Toko',
    path: '/toko/:id/report',
    component: Main,
    exact: true
  },
  {
    id: 8,
    title: 'Produk Toko',
    path: '/toko/:id/produk/:id',
    component: Main,
    exact: true
  },
  {
    id: 7,
    title: 'Produk Toko',
    path: '/toko/:id/produk',
    component: Main,
    exact: true
  },
  {
    id: 6,
    title: 'Detail Toko',
    path: '/toko/:id',
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
    path: '/customers/:id',
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
