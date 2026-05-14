import { getCurrentInstance } from 'vue'

export function useNotify() {
  const app =
    getCurrentInstance()

  return app?.appContext
    .config.globalProperties
    .$notify
}