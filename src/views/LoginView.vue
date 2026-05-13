<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h1 class="text-3xl font-bold mb-6">
      Login
    </h1>

    <form @submit.prevent="handleLogin">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full border p-3 rounded mb-4"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border p-3 rounded mb-4"
      />

      <button
        class="bg-slate-900 text-white px-4 py-3 rounded w-full"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import bcrypt from 'bcryptjs'

import { db } from '../db/indexedDb'

import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

const username = ref('')
const password = ref('')

const router = useRouter()

const authStore = useAuthStore()

async function handleLogin() {
  const user = await db.users
    .where('username')
    .equals(username.value)
    .first()

  if (!user) {
    alert('User not found')

    return
  }

  const validPassword = await bcrypt.compare(
    password.value,
    user.passwordHash
  )

  if (!validPassword) {
    alert('Invalid password')

    return
  }

  authStore.login(user.id!, user.username)

  router.push('/dashboard')
}
</script>