import { defineStore } from "pinia";
import { ref, watch } from "vue";

const STORAGE_KEY = "favoriteCoins";

function loadFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export const useFavoriteStore = defineStore("favorite", () => {

    const favorites = ref(loadFromStorage())

    // Keep localStorage in sync whenever favorites change
    watch(favorites, (value) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    }, { deep: true })

    function isFavorite(id) {
        return favorites.value.includes(id)
    }

    function addFavorite(id){

        if(!favorites.value.includes(id)){

            favorites.value.push(id)

        }

    }

    function removeFavorite(id){

        favorites.value =
        favorites.value.filter(item=>item!==id)

    }

    function toggleFavorite(id) {
        if (isFavorite(id)) {
            removeFavorite(id)
        } else {
            addFavorite(id)
        }
    }

    return{

        favorites,

        isFavorite,

        addFavorite,

        removeFavorite,

        toggleFavorite

    }

})