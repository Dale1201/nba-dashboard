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

function getSeasonAverage(totalStat, gamesPlayed) {
  return (totalStat / gamesPlayed).toFixed(1);
}
</script>

<template>
  <Dialog :header="`${playerName}`" modal style="width: 80vw" @show="fetchPlayerInfo">
    <div>
      <div class="headshot-container">
        <img
          :src="getPlayerHeadshot(playerId)"
          onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
          alt="player image"
        />
      </div>
    </div>
    <ProgressSpinner v-if="isLoading" style="width: 50px; height: 50px; display: flex; justify-content: center;" />
    <div v-if="!isLoading">
      <p>Position: {{ playerInfo["POSITION"] || "N/A" }}</p>
      <p>Team: {{ `${playerInfo["TEAM_CITY"]} ${playerInfo["TEAM_NAME"]}` || "N/A" }}</p>
      <p>Height: {{ playerInfo["HEIGHT"] }}</p>
    </div>
    <h1>Season Averages</h1>
    <div v-if="isLoading"></div>
    <div v-else-if="displaySeasonStats && displaySeasonStats.length == 0">No data available for this player</div>
    <div v-else class="season-average-container">
      <DataTable :value="displaySeasonStats">
        <column field="GP" header="Games Played"></column>
        <column field="TEAM_ABBREVIATION" header="Team"></column>
        <column field="SEASON_ID" header="Season"></column>
        <column field="PTS" header="PTS">
          <template #body="slotProps">
            {{ getSeasonAverage(slotProps.data["PTS"], slotProps.data["GP"]) }}
          </template>
        </column>
        <column field="REB" header="REB">
          <template #body="slotProps">
            {{ getSeasonAverage(slotProps.data["REB"], slotProps.data["GP"]) }}
          </template>
        </column>
        <column field="AST" header="AST">
          <template #body="slotProps">
            {{ getSeasonAverage(slotProps.data["AST"], slotProps.data["GP"]) }}
          </template>
        </column>
        <column field="STL" header="STL">
          <template #body="slotProps">
            {{ getSeasonAverage(slotProps.data["STL"], slotProps.data["GP"]) }}
          </template>
        </column>
        <column field="BLK" header="BLK">
          <template #body="slotProps">
            {{ getSeasonAverage(slotProps.data["BLK"], slotProps.data["GP"]) }}
          </template>
        </column>
        <column field="FG_PCT" header="FG%"></column>
        <column field="FG3_PCT" header="3P%"></column>
        <column field="FT_PCT" header="FT%"></column>
      </DataTable>

      <div class="load-button-container">
        <Button @click="loadMore" v-if="!loadMoreClicked && seasonStats.length > 3">View All</Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
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
