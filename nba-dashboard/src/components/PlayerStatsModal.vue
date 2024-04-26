<script setup>
import Dialog from "primevue/dialog";
import PlayerService from "../api/nba-api/player-service";
import { computed, defineProps, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import { teamCodeToName } from "../utils/translaters/teamCodeToId";

const props = defineProps({
  playerId: Number,
  playerName: String,
});

const playerInfo = ref({});
const seasonStats = ref([]);
const playoffsStats = ref([]);

// Playoffs or season stats visibility
const showPlayoffs = ref(false);
function togglePlayoffs() {
  showPlayoffs.value = !showPlayoffs.value;
}

const displaySeasonStats = computed(() => {
  if (showPlayoffs.value) {
    return loadMoreClicked.value ? playoffsStats.value : playoffsStats.value?.slice(0, 3);
  }
  return loadMoreClicked.value ? seasonStats.value : seasonStats.value?.slice(0, 3);
});

const isLoading = ref(false);
async function fetchPlayerInfo() {
  if (!props.playerId) {
    return;
  }
  isLoading.value = true;
  playerInfo.value = await PlayerService.getPlayerInfo(props.playerId);
  seasonStats.value = await PlayerService.getPlayerSeasonStats(props.playerId);
  playoffsStats.value = await PlayerService.getPlayerPlayoffStats(props.playerId);
  isLoading.value = false;

  // Reset load more clicks
  loadMoreClicked.value = false;
}

// Load more logic
const loadMoreClicked = ref(false);
async function loadMore() {
  loadMoreClicked.value = true;
}
</script>

<template>
  <Dialog
    :header="`${playerName}`"
    modal
    style="width: 80vw; min-width: 25rem"
    @show="fetchPlayerInfo"
  >
    <div style="display: flex; gap: 2rem; flex-wrap: wrap">
      <div class="headshot-container">
        <img
          :src="getPlayerHeadshot(playerId)"
          onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
          alt="player image"
        />
      </div>
      <div v-if="!isLoading">
        <p>Position: {{ playerInfo["Position"] || "N/A" }}</p>
        <p>
          Team:
          {{ `${teamCodeToName[playerInfo["Teams"]?.slice(-1)]}` || "N/A" }}
        </p>
        <p>Height: {{ playerInfo["Height"] }}</p>
      </div>
    </div>
    <ProgressSpinner
      v-if="isLoading"
      style="width: 50px; height: 50px; display: flex; justify-content: center"
    />
    <button class="table-heading" @click="togglePlayoffs">
      <Transition :name="!showPlayoffs ? 'slide-in' : 'slide-in-reverse'" mode="out-in">
        <h1 v-if="!showPlayoffs">Season Averages</h1>
        <h1 v-else>Playoff Averages</h1>
      </Transition>
      <Transition name="rotate" mode="out-in">
        <Button
          @click.stop="togglePlayoffs"
          v-if="showPlayoffs"
          :icon="'pi pi-angle-left'"
        />
        <Button v-else @click.stop="togglePlayoffs" :icon="'pi pi-angle-right'" />
      </Transition>
    </button>
    <div v-if="!isLoading && displaySeasonStats && displaySeasonStats.length == 0">
      No data available for this player
    </div>
    <div v-else class="season-average-container">
      <DataTable :value="displaySeasonStats">
        <column field="GamesPlayed" header="Games Played" sortable></column>
        <column field="Team" header="Team"></column>
        <column field="Season" header="Season" sortable></column>
        <column field="PtsPerGame" header="PTS" sortable>
          <template #body="slotProps">
            {{ slotProps.data["PtsPerGame"] }}
          </template>
        </column>
        <column field="RebPerGame" header="REB" sortable>
          <template #body="slotProps">
            {{ slotProps.data["RebPerGame"] }}
          </template>
        </column>
        <column field="AstPerGame" header="AST" sortable>
          <template #body="slotProps">
            {{ slotProps.data["AstPerGame"] }}
          </template>
        </column>
        <column field="StlPerGame" header="STL" sortable>
          <template #body="slotProps">
            {{ slotProps.data["StlPerGame"] }}
          </template>
        </column>
        <column field="BlkPerGame" header="BLK" sortable>
          <template #body="slotProps">
            {{ slotProps.data["BlkPerGame"] }}
          </template>
        </column>
        <column field="FGP" header="FG%" sortable></column>
        <column field="ThreePP" header="3P%" sortable></column>
        <column field="FTP" header="FT%" sortable></column>
      </DataTable>

      <div class="load-button-container">
        <Button @click="loadMore" v-if="!loadMoreClicked && seasonStats.length > 3"
          >View All</Button
        >
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.headshot-container {
  width: fit-content;
}

.table-heading {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  button {
    background-color: transparent;
    border: none;
    color: white;
    transition: all 0.3s;
  }
}

:deep(.p-button-icon) {
  font-size: 1.5rem;
}

.slide-in-enter-from {
  opacity: 0;

  transform: translateX(50%);
}

.slide-in-leave-to {
  opacity: 1;
  transform: translateX(-100%);
}

.slide-in-enter-active,
.slide-in-leave-active,
.slide-in-reverse-enter-active,
.slide-in-reverse-leave-active {
  transition: transform 0.2s;
}

.slide-in-reverse-enter-from {
  opacity: 0;
  transform: translateX(-50%);
}

.slide-in-reverse-leave-to {
  opacity: 1;
  transform: translateX(100%);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.1s;
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg);
}

.rotate-leave-to {
  opacity: 1;
  transform: rotate(0deg);
}

.season-average-container {
  margin-top: 1rem;
}

.load-button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.load-button-container > button {
  background-color: transparent;
  border: none;
  color: #7989ff;
}
</style>
