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
        <div class="flex justify-between items-center">
          <div>
            {{ stop.stopName }}
            ({{ stop.stopCode }})
          </div>

          <button @click="addToFavorites(stop)" class="bg-blue-500 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
  <FavoriteBoards :favorites="favoritesStore.favorites" @remove="handleRemoveFavorite" @update-note="
    handleUpdateNote
  " />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import StopSearch from '../components/StopSearch.vue'

import { useStops } from '../composables/useStops'

import { useFavoritesStore } from '../stores/favorites'

import { useAuthStore } from '../stores/authStore'

import FavoriteBoards from '../components/FavoriteBoards.vue'

import { useNotify } from '../composables/useNotify'

const favoritesStore = useFavoritesStore()

const authStore = useAuthStore()

const search = ref('')

const notify = useNotify()

const {
  stops,
  loading,
  error,
  fetchStops
} = useStops()

onMounted(async () => {
  await fetchStops()
  console.log(
    JSON.stringify(
      stops.value,
      null,
      2
    )
  )

  if (authStore.userId) {
    await favoritesStore.loadFavorites(
      authStore.userId
    )
  }
})

const filteredStops = computed(() => {
  return stops.value.filter(
    (stop) =>
      (stop.stopName || '')
        .toLowerCase()
        .includes(
          search.value.toLowerCase()
        )
  )
})

async function addToFavorites(stop: any) {
  await favoritesStore.addFavorite(
    authStore.userId!,
    stop.stopId,
    stop.stopName,
    stop.stopCode,
    ''
  )
  notify('Stop added to favorites!')
}
async function handleRemoveFavorite(
  stopId: number
) {
  await favoritesStore.removeFavorite(
    stopId
  )

  notify?.('Favorite removed')
}

async function handleUpdateNote(stopId: number, note: string) {
  await favoritesStore.updateFavorite(stopId, note)
  notify?.('Note updated')
}
</script>