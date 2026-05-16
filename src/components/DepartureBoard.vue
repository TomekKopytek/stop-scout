<template>
  <div>
    <div v-if="loading">
      Ładowanie odjazdów...
    </div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-2">
      <div v-for="departure in departures" :key="departure.trip" class="border rounded p-3">
        <div class="font-bold text-lg">
          {{ departure.routeId }}
        </div>

        <div>
          {{ departure.headsign }}
        </div>

        <div>
          Odjazd:
          {{
            new Date(
              departure.estimatedTime
            ).toLocaleTimeString(
              'pl-PL',
              {
                hour: '2-digit',
                minute: '2-digit'
              }
            )
          }}
        </div>

        <div>
          Opóźnienie:
          {{
            departure.delayInSeconds > 0
              ? `${departure.delayInSeconds}s`
          : 'Na czas'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useDepartures } from '../composables/useDepartures'

const props = defineProps<{
  stopId: number
}>()

console.log(props.stopId)

const {
  departures,
  loading,
  error,
  fetchDepartures
} = useDepartures()

onMounted(() => {
  fetchDepartures(props.stopId)
})
</script>