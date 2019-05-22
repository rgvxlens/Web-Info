import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import Profile from '@/components/Profile'
import login from '@/components/login'
Vue.use(Router)

// export default new Router({
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
