<template>
    <nav class="bg-slate-900 text-white shadow">
        <div class="max-w-6xl mx-auto p-4 flex justify-between">
            <h1 class="text-xl font-bold">
                Stop Scout
            </h1>

            <div class="flex gap-4 items-center">
                <span v-if="authStore.isAuthenticated" class="text-slate-300">
                    Witaj, {{ authStore.user }}!
                </span>
                
                <RouterLink v-if="authStore.isAuthenticated" to="/dashboard">
                    Lista przystanków
                </RouterLink>
                <RouterLink v-if="authStore.isAuthenticated" to="/favorites">
                    Polubione przystanki
                </RouterLink>
                <RouterLink v-if="!authStore.isAuthenticated" to="/register">
                    Zarejestruj
                </RouterLink>
                <RouterLink v-if="!authStore.isAuthenticated" to="/login">
                    Zaloguj
                </RouterLink>
                <button v-if="authStore.isAuthenticated" @click="logout" class="cursor-pointer">
                    Wyloguj
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNotify } from '../composables/useNotify'
import { useAuthStore } from '../stores/authStore'
const notify = useNotify()
const router = useRouter()

const authStore = useAuthStore()

function logout() {
    authStore.logout()
    notify?.('Wylogowano')

    router.push('/login')
}
</script>