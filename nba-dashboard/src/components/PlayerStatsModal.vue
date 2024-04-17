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

const displaySeasonStats = computed(() => {
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
    <h1>Season Averages</h1>
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
