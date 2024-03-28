<script setup>
import Dialog from "primevue/dialog";
import PlayerService from "../api/nba-api/player-service";
import { computed, defineProps, onUpdated, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";

const props = defineProps({
  playerId: Number,
  playerName: String,
});

const playerInfo = ref({});
const seasonStats = ref([]);

const displaySeasonStats = computed(() => {
  return loadMoreClicked.value ? seasonStats.value : seasonStats.value?.slice(0, 3);
});

const isLoading = ref(false);
async function fetchPlayerInfo() {
  isLoading.value = true;
  playerInfo.value = await PlayerService.getPlayerInfo(props.playerId);
  seasonStats.value = await PlayerService.getPlayerSeasonStats(props.playerId);
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
  <Dialog :header="`${playerName}`" modal style="width: 80vw" @show="fetchPlayerInfo">
    <div style="display: flex; gap: 2rem; flex-wrap: wrap">
      <div class="headshot-container">
        <img
          :src="getPlayerHeadshot(playerId)"
          onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
          alt="player image"
        />
      </div>
      <div v-if="!isLoading">
        <p>Position: {{ playerInfo["POSITION"] || "N/A" }}</p>
        <p>Team: {{ `${playerInfo["TEAM_CITY"]} ${playerInfo["TEAM_NAME"]}` || "N/A" }}</p>
        <p>Height: {{ playerInfo["HEIGHT"] }}</p>
      </div>
    </div>
    <ProgressSpinner v-if="isLoading" style="width: 50px; height: 50px; display: flex; justify-content: center" />
    <h1>Season Averages</h1>
    <div v-if="!isLoading && displaySeasonStats && displaySeasonStats.length == 0">
      No data available for this player
    </div>
    <div v-else class="season-average-container">
      <DataTable :value="displaySeasonStats">
        <column field="GP" header="Games Played" sortable></column>
        <column field="TEAM_ABBREVIATION" header="Team"></column>
        <column field="SEASON_ID" header="Season" sortable></column>
        <column field="PTS" header="PTS" sortable>
          <template #body="slotProps">
            {{ slotProps.data["PTS"] }}
          </template>
        </column>
        <column field="REB" header="REB" sortable>
          <template #body="slotProps">
            {{ slotProps.data["REB"] }}
          </template>
        </column>
        <column field="AST" header="AST" sortable>
          <template #body="slotProps">
            {{ slotProps.data["AST"] }}
          </template>
        </column>
        <column field="STL" header="STL" sortable>
          <template #body="slotProps">
            {{ slotProps.data["STL"] }}
          </template>
        </column>
        <column field="BLK" header="BLK" sortable>
          <template #body="slotProps">
            {{ slotProps.data["BLK"] }}
          </template>
        </column>
        <column field="FG_PCT" header="FG%" sortable></column>
        <column field="FG3_PCT" header="3P%" sortable></column>
        <column field="FT_PCT" header="FT%" sortable></column>
      </DataTable>

      <div class="load-button-container">
        <Button @click="loadMore" v-if="!loadMoreClicked && seasonStats.length > 3">View All</Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.headshot-container {
  width: fit-content;
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
