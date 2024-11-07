import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Accounts from '@/views/Accounts.vue'
import { config } from '@/config'

const { VITE_BASE_URL } = config

const router = createRouter({
  history: createWebHistory(VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    }
  ]
})

export default router
