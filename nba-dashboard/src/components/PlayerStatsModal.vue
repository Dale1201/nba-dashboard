<script setup>
import Dialog from "primevue/dialog";
import PlayerService from "../api/nba-api/player-service";
import { defineProps, onUpdated, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps({
  playerId: Number,
  playerName: String,
});

const seasonAverages = ref();

const playerInfo = ref();

async function fetchPlayerInfo() {
  // seasonAverages.value = await PlayerService.getPlayerSeasonAverages(props.playerInfo.id);
  playerInfo.value = await PlayerService.getPlayerInfo(props.playerId);

  // Reset load more clicks
  loadMoreClicks.value = 0;
}

// Load more logic
const loadMoreClicks = ref(0);
const hideLoadMore = ref(false);
async function loadMore() {
  loadMoreClicks.value++;

  hideLoadMore.value = true;
  seasonAverages.value = await PlayerService.getPlayerSeasonAverages(props.playerInfo.id, 2019 - loadMoreClicks.value*3);
  hideLoadMore.value = false;
}
</script>

<template>
  <Dialog :header="`${playerName}`" modal style="width: 80vw" @show="fetchPlayerInfo">
    <p>{{ playerInfo }}</p>
    <!-- <div>
      <div class="headshot-container">
        <img src="/player-headshots/2544.png" alt="player image" />
      </div>
    </div>
    <div>
      <p>Position: {{ playerInfo.position || "N/A" }}</p>
      <p>Team: {{ playerInfo.team.full_name || "N/A" }}</p>
      <p>Height: {{ playerInfo.height_feet }}-{{ playerInfo.height_inches }}</p>
    </div>
    <h1>Season Averages</h1>
    <div v-if="seasonAverages === undefined">Loading...</div>
    <div v-else-if="seasonAverages.length == 0">No data available for this player</div>
    <div v-else class="season-average-container">
      <DataTable :value="seasonAverages">
        <column field="games_played" header="Games Played"></column>
        <column field="season" header="Season"></column>
        <column field="pts" header="PTS"></column>
        <column field="reb" header="REB"></column>
        <column field="ast" header="AST"></column>
        <column field="stl" header="STL"></column>
        <column field="blk" header="BLK"></column>
        <column field="fg_pct" header="FG%"></column>
        <column field="fg3_pct" header="3P%"></column>
        <column field="ft_pct" header="FT%"></column>
      </DataTable>

      <div class="load-button-container">
        <ProgressSpinner v-if="hideLoadMore" style="width: 50px; height: 50px" />
        <Button @click="loadMore" v-else>Load More</Button>
      </div>
    </div> -->
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
