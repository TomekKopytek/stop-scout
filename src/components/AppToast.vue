<template>
  <div
    v-if="store.visible"
    class="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50"
  >
    {{ store.message }}
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore }
from '../stores/notificationStore'

const store =
  useNotificationStore()
</script>