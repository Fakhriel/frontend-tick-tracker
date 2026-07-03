const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Helper
 */

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

/**
 * Market Coins
 */

export function getCoins() {
  return request(
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  );
}

/**
 * Market Coins with 7d sparkline (for mini charts, e.g. Home preview section)
 */

export function getCoinsWithSparkline({ perPage = 250 } = {}) {
  return request(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=24h`
  );
}

/**
 * Market Coins by specific ids, with sparkline (used to enrich trending
 * coins with real price/sparkline data)
 */

export function getMarketsByIds(ids = []) {
  if (!ids.length) return Promise.resolve([]);
  return request(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${ids.length}&page=1&sparkline=true&price_change_percentage=24h&ids=${ids.join(",")}`
  );
}

/**
 * Coin Detail
 */

export function getCoin(id) {
  return request(`/coins/${id}`);
}

/**
 * Line Chart
 */

export function getChart(id, days = 7) {
  return request(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
}

/**
 * OHLC
 */

export function getOHLC(id, days = 7) {
  return request(
    `/coins/${id}/ohlc?vs_currency=usd&days=${days}`
  );
}

/**
 * Trending
 */

export function getTrending() {
  return request("/search/trending");
}

/**
 * Global Market
 */

export function getGlobal() {
  return request("/global");
}