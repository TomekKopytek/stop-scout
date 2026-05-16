<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h1 class="text-3xl font-bold mb-6">
      Rejestracja
    </h1>

    <form @submit.prevent="handleRegister">
      <input
        v-model="username"
        type="text"
        placeholder="Nazwa konta"
        class="w-full border p-3 rounded mb-4"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Hasło"
        class="w-full border p-3 rounded mb-4"
      />

      <button
        class="bg-slate-900 text-white px-4 py-3 rounded w-full"
      >
        Zarejestruj
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useNotify } from '../composables/useNotify'

import bcrypt from 'bcryptjs'

import { db } from '../db/indexedDb'
const notify = useNotify()
const router = useRouter()
const username = ref('')
const password = ref('')

async function handleRegister() {
  const existingUser = await db.users
    .where('username')
    .equals(username.value)
    .first()

  if (existingUser) {
    alert('Podany użytkownik już istnieje')

    return
  }

  const passwordHash = await bcrypt.hash(password.value, 10)

  await db.users.add({
    username: username.value,
    passwordHash
  })

  notify?.('Konto zarejestrowane z powodzeniem!')
  router.push('/login')
}


</script>