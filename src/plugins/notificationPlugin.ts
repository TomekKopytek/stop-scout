import type { App } from 'vue'

import { useNotificationStore } from '../stores/notificationStore'

export default {
  install(app: App) {
    app.config.globalProperties
      .$notify = (
        message: string
      ) => {
        const store =
          useNotificationStore()

        store.show(message)
      }
  }
}