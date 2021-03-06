import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router);

const routes = [
  {
    name: 'Login',
    path: '/login',
    meta: {
        hideForAuth: true,
        permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
    },
    component: () => import('@/views/dashboard/components/core/Login')
  },
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    meta: {
      requiresAuth: true,
      permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
    },
    children: [
      // Dashboard
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/Dashboard'),
        meta: {
          requiresAuth: true,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        },
      },
      // Pages
      {
        name: 'Página de registro',
        path: '/pages/user',
        component: () => import('@/views/dashboard/pages/UserProfile'),
        meta: {
          requiresAuth: true,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        },
      },
      // Tables
      {
        name: 'Relação de inscritos',
        path: '/tables/regular-tables',
        component: () => import('@/views/dashboard/tables/RegularTables'),
        meta: {
          requiresAuth: true,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        },
      },
      {
        name: 'Lista negra',
        path: '/tables/black-list',
        component: () => import('@/views/dashboard/tables/BlackList'),
        meta: {
          requiresAuth: true,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        },
      },
      {
        name: 'Ranking semanal da guerra',
        path: '/tables/war-ranking',
        component: () => import('@/views/dashboard/tables/WarRanking'),
        meta: {
          requiresAuth: true,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        },
      },
      {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications'),
        meta: {
          requiresAuth: true,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        }
      },
      /*{
        name: 'Icons',
        path: 'components/icons',
        component: () => import('@/views/dashboard/component/Icons'),
      },
      {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography'),
      },
      // Maps
      {
        name: 'Google Maps',
        path: 'maps/google-maps',
        component: () => import('@/views/dashboard/maps/GoogleMaps'),
      },
      // Upgrade
      {
        name: 'Upgrade',
        path: 'upgrade',
        component: () => import('@/views/dashboard/Upgrade'),
      },*/
      {
        name: "Página não encontrada",
        path: "/:pathMatch(.*)*",
        component: () => import('@/views/PageNotFound'),
        meta: {
          requiresAuth: false,
          permissions: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER']
        },
      }
    ],
  },
];

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

const localStore = store;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStore.state.user) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});


export default router;
