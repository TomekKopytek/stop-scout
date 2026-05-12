import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | string
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    login(username: string) {
      this.user = username

      localStorage.setItem('currentUser', username)
    },

    logout() {
      this.user = null

      localStorage.removeItem('currentUser')
    },

    loadUser() {
      const user = localStorage.getItem('currentUser')

      if (user) {
        this.user = user
      }
    }
  }
})