<template>
  <div class="space-y-4 mt-8">
    <h2 class="text-2xl font-bold">
      Favorite Stops
    </h2>

    <div v-for="favorite in favorites" :key="favorite.stopId" class="bg-white rounded shadow p-4">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="font-bold text-lg">
            {{ favorite.stopName }}
            ({{ favorite.stopCode }})
          </h3>

          <div class="mt-2 flex items-center">
            <input v-model="favorite.note" placeholder="Name this stop..." :disabled="editingStopId !== favorite.stopId
              " class="border rounded px-2 py-1 disabled:bg-gray-100 disabled:text-gray-500, disabled:cursor-not-allowed" />

            <button v-if="
              editingStopId !== favorite.stopId
            " @click="
              editingStopId = favorite.stopId
              " class="ml-2 bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
              Edit
            </button>

            <button v-else @click="
              () => {
                $emit(
                  'update-note',
                  favorite.stopId,
                  favorite.note
                )

                editingStopId = null
              }
            " class="ml-2 bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
              Save
            </button>
          </div>
        </div>

        <button @click="$emit('remove', favorite.stopId)" class="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
          Remove
        </button>
      </div>

      <DepartureBoard v-if="favorite.stopId" :stop-id="favorite.stopId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DepartureBoard from './DepartureBoard.vue'
import { ref } from 'vue';

defineProps<{
  favorites: any[]
}>()

defineEmits([
  'remove',
  'update-note'
])

const editingStopId = ref<
  number | null
>(null)
</script>