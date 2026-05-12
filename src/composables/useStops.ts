import { ref } from "vue";

import { db } from "../db/indexedDb";

import type { Stop } from "../types/stop";

const STOPS_URL =
  "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json";

export function useStops() {
  const stops = ref<Stop[]>([]);

  const loading = ref(false);

  const error = ref("");

  async function fetchStops() {
    loading.value = true;

    error.value = "";

    try {
      const cacheInfo = await db.table("cacheMetadata").get("stops-cache");

      const now = Date.now();

      const isCacheValid =
        cacheInfo && now - cacheInfo.timestamp < 24 * 60 * 60 * 1000;

      if (isCacheValid) {
        console.log("Using cached stops");

        stops.value = await db.cachedStops.toArray();

        return;
      }

      console.log("Fetching fresh stops");

      const response = await fetch(STOPS_URL);

      const data = await response.json();

      console.log(data);

      const stopsArray = Object.values(data)
        .flatMap((day: any) => day.stops) as Stop[]
      console.log(stopsArray[0])

      await db.cachedStops.clear();

      await db.cachedStops.bulkAdd(stopsArray);

      await db.table("cacheMetadata").put({
        key: "stops-cache",
        timestamp: now,
      });

      stops.value = stopsArray;
    } catch (err) {
      console.error("STOPS ERROR:", err);

      error.value = "Failed to load stops";
    } finally {
      loading.value = false;
    }
  }

  return {
    stops,
    loading,
    error,
    fetchStops,
  };
}
