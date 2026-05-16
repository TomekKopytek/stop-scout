<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">
      Przystanki
    </h1>

    <StopSearch v-model="search" />

    <p class="mb-4 text-slate-600">
      Znaleziono: {{ filteredStops.length }} przystanków
    </p>

    <div v-if="loading">
      Ładowanie przystanków
    </div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-2">
      <div v-for="
stop in filteredStops.slice(0, 50)
        " :key="stop.stopId" class="bg-white p-4 rounded shadow">
        <div class="flex justify-between items-center mb-4">
          <div>
            {{ stop.stopName }}
            ({{ stop.stopCode }})
          </div>

          <div class="flex gap-2">
            <button @click="
              toggleDetails(
                stop.stopId
              )
              " class="bg-slate-500 hover:bg-slate-700 transition text-white px-3 py-1 rounded">
              Szczegóły
            </button>

            <button @click="addToFavorites(stop)" :disabled="isFavorite(stop.stopId)" class="
    px-3 py-1 rounded text-white transition
  " :class="isFavorite(stop.stopId)
      ? 'bg-green-500 cursor-not-allowed'
      : 'bg-blue-500 hover:bg-blue-700'
    ">
              {{
                isFavorite(stop.stopId)
                  ? 'Polubiono'
              : 'Polub'
              }}
            </button>
          </div>
        </div>
        <Transition name="fade">
          <DepartureBoard v-if="
          expandedStops.includes(
            stop.stopId
          )
        " :stop-id="stop.stopId" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref
} from 'vue'

import StopSearch
  from '../components/StopSearch.vue'

import DepartureBoard
  from '../components/DepartureBoard.vue'

import {
  useStops
} from '../composables/useStops'

import {
  useFavoritesStore
} from '../stores/favorites'

import {
  useAuthStore
} from '../stores/authStore'

import {
  useNotify
} from '../composables/useNotify'

const favoritesStore =
  useFavoritesStore()

const authStore =
  useAuthStore()

const notify =
  useNotify()

const search = ref('')

const expandedStops =
  ref<number[]>([])

const {
  stops,
  loading,
  error,
  fetchStops
} = useStops()

onMounted(async () => {
  await fetchStops()

  if (authStore.userId) {
    await favoritesStore
      .loadFavorites(
        authStore.userId
      )
  }
})

const filteredStops =
  computed(() => {

    const seen = new Set()

    return stops.value.filter(
      (stop) => {

        const name =
          (
            stop.stopName || ''
          ).trim()

        const code =
          (
            stop.stopCode || ''
          ).trim()

        const key =
          `${name}-${code}`

        if (seen.has(key)) {
          return false
        }

        seen.add(key)

        return name
          .toLowerCase()
          .includes(
            search.value
              .toLowerCase()
          )
      }
    )
  })

async function addToFavorites(
  stop: any
) {
  await favoritesStore
    .addFavorite(
      authStore.userId!,
      stop.stopId,
      stop.stopName,
      stop.stopCode,
      ''
    )

  notify(
    'Dodano przystanek do listy polubionych'
  )
}
function isFavorite(stopId: number) {
  return favoritesStore.favorites.some(
    (favorite) =>
      favorite.stopId === stopId
  )
}

function toggleDetails(
  stopId: number
) {
  if (
    expandedStops.value.includes(
      stopId
    )
  ) {
    expandedStops.value =
      expandedStops.value.filter(
        (id) => id !== stopId
      )
  } else {
    expandedStops.value.push(
      stopId
    )
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>