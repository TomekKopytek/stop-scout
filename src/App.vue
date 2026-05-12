<template>
  <div class="min-h-screen bg-slate-100">
    <AppNavbar />

    <main class="max-w-6xl mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>