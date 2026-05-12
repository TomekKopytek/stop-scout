import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '../stores/authStore'

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
  },
  {
  path: '/register',
  component: RegisterView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login', '/register']

  if (
    !publicRoutes.includes(to.path) &&
    !authStore.isAuthenticated
  ) {
    return '/login'
  }
})