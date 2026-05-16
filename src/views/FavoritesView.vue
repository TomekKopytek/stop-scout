<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">
            Moje przystanki
        </h1>

        <FavoriteBoards :favorites="favoritesStore.favorites
            " @remove="
        handleRemoveFavorite
    " @update-note="
        handleUpdateNote
    " />
    </div>
</template>

<script setup lang="ts">
import {
    onMounted
} from 'vue'

import FavoriteBoards
    from '../components/FavoriteBoards.vue'

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

onMounted(async () => {
    if (authStore.userId) {
        await favoritesStore
            .loadFavorites(
                authStore.userId
            )
    }
})

async function handleRemoveFavorite(
    stopId: number
) {
    await favoritesStore
        .removeFavorite(stopId)

    notify('Polubiony przystanek usunięty')
}

async function handleUpdateNote(
    stopId: number,
    note: string
) {
    await favoritesStore
        .updateFavorite(
            stopId,
            note
        )

    notify('Notatka zmieniona')
}
</script>