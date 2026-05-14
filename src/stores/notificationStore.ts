import { defineStore } from 'pinia'

export const useNotificationStore =
  defineStore('notification', {
    state: () => ({
      message: '',
      visible: false
    }),

    actions: {
      show(message: string) {
        this.message = message

        this.visible = true

        setTimeout(() => {
          this.visible = false
        }, 3000)
      }
    }
  })