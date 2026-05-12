<template>
    <nav class="bg-slate-900 text-white shadow">
        <div class="max-w-6xl mx-auto p-4 flex justify-between">
            <h1 class="text-xl font-bold">
                Stop Scout
            </h1>

            <div class="flex gap-4 items-center">
                <span v-if="authStore.isAuthenticated" class="text-slate-300">
                    Hello, {{ authStore.user }}!
                </span>
                <RouterLink v-if="authStore.isAuthenticated" to="/dashboard">
                    Dashboard
                </RouterLink>

                <RouterLink v-if="!authStore.isAuthenticated" to="/register">
                    Register
                </RouterLink>

                <RouterLink v-if="!authStore.isAuthenticated" to="/login">
                    Login
                </RouterLink>

                <button v-if="authStore.isAuthenticated" @click="logout" class="cursor-pointer">
                    Logout
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

const router = useRouter()

const authStore = useAuthStore()

function logout() {
    authStore.logout()

    router.push('/login')
}
</script>