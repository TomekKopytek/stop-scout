import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | string
  }),

  actions: {
    login(username: string) {
      this.user = username
    },

    logout() {
      this.user = null
    }
  }
})