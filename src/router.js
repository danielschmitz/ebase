import Vue from 'vue'
import Router from 'vue-router'
import auth from './services/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "logout" */ './views/Logout.vue')
    },
    {
      path: '/northwind-categories',
      name: 'northind-categories',
      meta: { requiresAuth: false },
      component: () => import(/* webpackChunkName: "northwind" */ './views/Northwind/Categories')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!auth.needLogin(to)) return next()

  return next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
})

export default router
