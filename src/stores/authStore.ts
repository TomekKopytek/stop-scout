import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem(
      'currentUser'
    ) as string | null,

    userId: Number(
      localStorage.getItem(
        'currentUserId'
      )
    ) || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    login(userId: number, username: string) {
      this.user = username

      this.userId = userId

      localStorage.setItem(
        'currentUser',
        username
      )

      localStorage.setItem(
        'currentUserId',
        userId.toString()
      )
    },

    logout() {
      this.user = null

      this.userId = null

      localStorage.removeItem(
        'currentUser'
      )

      localStorage.removeItem(
        'currentUserId'
      )
    },

    loadUser() {
      const user = localStorage.getItem(
        'currentUser'
      )

      const userId = localStorage.getItem(
        'currentUserId'
      )

      if (user && userId) {
        this.user = user

        this.userId = Number(userId)
      }
    }
  }
})