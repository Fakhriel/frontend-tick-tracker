import { ref } from "vue";

const API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

export function useCrypto() {
  const coins = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchCoins() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed fetch");
      }

      coins.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    coins,
    loading,
    error,
    fetchCoins,
  };
}