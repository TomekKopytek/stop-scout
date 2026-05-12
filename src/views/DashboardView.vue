<template>
  <div>
    <h1 class="text-3xl font-bold">
      Dashboard
    </h1>

    <p class="mt-4">
      Logged as:
      <strong>
        {{ authStore.user }}
      </strong>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
</script>