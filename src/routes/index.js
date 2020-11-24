import { Login, Main, NotFound } from 'pages';

// main routes here
const appRoutes = [
  {
    id: 3,
    title: 'Login',
    path: '/login',
    component: Login,
    exact: true
  },
  {
    id: 2,
    title: 'Halama Utama',
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
