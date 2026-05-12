<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold mb-4">
      Dashboard
    </h1>

    <button
      @click="testDb"
      class="bg-slate-900 text-white px-4 py-2 rounded"
    >
      Test IndexedDB
    </button>
  </div>
</template>

<script setup lang="ts">
import { db } from '../db/indexedDb'

async function testDb() {
  try {
    await db.table('users').add({
      username: 'test-user'
    })

    alert('Zapisano do IndexedDB!')
  } catch (error) {
    console.error(error)

    alert('Błąd IndexedDB')
  }
}
</script>