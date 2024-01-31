<script setup>
import { onMounted, ref, watch } from "vue";
import PlayerService from "../api/player-service";
import { debounce } from "../utils/debounceDelay";

const players = ref([]);
onMounted(async () => {
  players.value = await PlayerService.getPlayers();
});

const search = ref("");

let debouncedSearch;
watch(search, async () => {
  if (!debouncedSearch) {
    debouncedSearch = debounce(async () => {
      players.value = await PlayerService.getPlayers(search.value);
    }, 1000);
  }
  debouncedSearch();
});

const playerId = ref();
const playerIdData = ref();
let debouncedPlayerId;
watch(playerId, async () => {
  if (!debouncedPlayerId) {
    debouncedPlayerId = debounce(async () => {
      playerIdData.value = await PlayerService.getPlayer(playerId.value);
    }, 1000);
  }
  debouncedPlayerId();
});
</script>

<template>
  <h1>Players</h1>
  <input type="text" v-model="search" />
  <input type="number" v-model="playerId"/>
  <p>{{ playerIdData }}</p>
  <p>{{ players }}</p>
</template>

<style scoped>
input {
  margin: 2rem;
}

</style>
