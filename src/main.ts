import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './style.css'
import { useAuthStore } from './stores/authStore'
import { vFocus } from './directives/focus'
import notificationPlugin from './plugins/notificationPlugin'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.directive('focus', vFocus)
app.use(router)
app.use(notificationPlugin)

const authStore = useAuthStore()

authStore.loadUser()

app.mount('#app')