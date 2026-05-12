import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    component: DashboardView
  },

  {
    path: '/login',
    component: LoginView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})