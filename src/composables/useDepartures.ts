import { ref } from "vue";

import type { Departure } from "../types/departure";

export function useDepartures() {
  const departures = ref<Departure[]>([]);

  const loading = ref(false);

  const error = ref("");

  async function fetchDepartures(stopId: number) {
    loading.value = true;

    error.value = "";

    try {
      const response = await fetch(
        `https://ckan2.multimediagdansk.pl/departures?stopId=${stopId}`,
      );

      const data = await response.json();
      console.log(data);
      const now = new Date();

      departures.value = (data.departures || [])
        .filter((departure: any) => {
          const departureTime = new Date(departure.estimatedTime);

          return departureTime >= now;
        })
        .slice(0, 5);
    } catch (err) {
      console.error(err);

      error.value = "Failed to load departures";
    } finally {
      loading.value = false;
    }
  }

  return {
    departures,
    loading,
    error,
    fetchDepartures,
  };
}
