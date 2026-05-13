import { defineStore } from "pinia";

import { ref } from "vue";

import { db } from "../db/indexedDb";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<any[]>([]);

  async function loadFavorites(userId: number) {
    favorites.value = await db.favoriteStops
      .where("userId")
      .equals(userId)
      .toArray();
  }

  async function addFavorite(
    userId: number,
    stopId: number,
    stopName: string,
    stopCode: string,
    note: "",
  ) {
    const newFavorite = {
      userId,
      stopId,
      stopName,
      stopCode,
    };

    favorites.value.push(newFavorite);

    await db.favoriteStops.add(newFavorite);
  }

  async function removeFavorite(stopId: number) {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.stopId !== stopId,
    );

    const favorite = await db.favoriteStops
      .where("stopId")
      .equals(stopId)
      .first();

    if (favorite?.id) {
      await db.favoriteStops.delete(favorite.id);
    }
  }
  async function updateFavorite(stopId: number, note: string) {
    const favorite = await db.favoriteStops
      .where("stopId")
      .equals(stopId)
      .first();

    if (!favorite?.id) return;

    await db.favoriteStops.update(favorite.id, {
      note,
    });

    const target = favorites.value.find(
      (favorite) => favorite.stopId === stopId,
    );

    if (target) {
      target.note = note;
    }
  }

  return {
    favorites,
    loadFavorites,
    addFavorite,
    removeFavorite,
    updateFavorite,
  };
});
