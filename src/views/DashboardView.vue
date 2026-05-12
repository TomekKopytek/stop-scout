<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">
      Stops
    </h1>

    <StopSearch v-model="search" />
    <p class="mb-4 text-slate-600">
      Found: {{ filteredStops.length }} stops
    </p>

    <div v-if="loading">
      Loading stops...
    </div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-2">
      <div v-for="stop in filteredStops.slice(0, 20)" :key="stop.stopId" class="bg-white p-4 rounded shadow">
        {{ stop.stopName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import StopSearch from '../components/StopSearch.vue'

import { useStops } from '../composables/useStops'

const search = ref('')

const {
  stops,
  loading,
  error,
  fetchStops
} = useStops()

onMounted(() => {
  fetchStops()
})

const filteredStops = computed(() => {
  return stops.value.filter((stop) =>
    (stop.stopName ?? '')
      .trim()
      .toLowerCase()
      .includes(search.value.trim().toLowerCase())
  )
})
</script>