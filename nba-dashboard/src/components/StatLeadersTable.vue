<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import STATS from "../utils/constants/stats";
import { onMounted, ref } from "vue";
import SeasonService from "../api/nba-api/season-service";
import ToggleButton from "primevue/togglebutton";
import NBA_SEASONS_YEARS from "../utils/constants/nba-seasons";
import Dropdown from "primevue/dropdown";
import ProgressSpinner from "primevue/progressspinner";

const selectedStat = ref("PTS");
const statLeaders = ref([]);
const fetchingData = ref(false);
onMounted(async () => {
  fetchingData.value = true;
  statLeaders.value = await SeasonService.getRegStatLeaders(selectedStat.value);
  fetchingData.value = false;
});

async function fetchStatLeaders() {
  statLeaders.value = [];

  fetchingData.value = true;
  if (showPlayoffLeaders.value) {
    statLeaders.value = await SeasonService.getPlayoffsStatLeaders(selectedStat.value, selectedSeason.value);
  } else {
    statLeaders.value = await SeasonService.getRegStatLeaders(selectedStat.value, selectedSeason.value);
  }
  fetchingData.value = false;
}

async function handleStatChange(stat) {
  if (!stat) return;
  selectedStat.value = stat;
  fetchStatLeaders();
}

const showPlayoffLeaders = ref(false);

const selectedSeason = ref(NBA_SEASONS_YEARS[0]);
</script>

<template>
  <div class="table-options-container">
    <ToggleButton
      v-model="showPlayoffLeaders"
      @change="fetchStatLeaders"
      onLabel="Playoffs"
      offLabel="Regular Season"
    />
    <Dropdown style="width: 10rem" v-model="selectedSeason" :options="NBA_SEASONS_YEARS" @change="fetchStatLeaders" />
  </div>
  <div style="padding: 1rem"></div>

  <DataTable
    v-if="statLeaders.length"
    class="stat-leader-table"
    :value="statLeaders"
    paginator
    :rows="10"
    :rowsPerPageOptions="[10, 20, 50]"
    :key="selectedStat"
  >
    <column field="RANK">
      <template #header>
        <div style="padding: 1rem">Rank</div>
      </template>
    </column>
    <column field="PLAYER">
      <template #header>
        <div style="padding: 1rem">Player</div>
      </template>
      <template #body="slotProps">
        <div class="player-col">
          <div class="headshot-container">
            <img
              :src="getPlayerHeadshot(slotProps.data.PLAYER_ID)"
              alt="Player Headshot"
              onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
            />
          </div>
          <p>{{ slotProps.data.PLAYER }}</p>
        </div>
      </template>
    </column>
    <column field="TEAM">
      <template #header> <div style="padding: 1rem">Team</div> </template></column
    >
    <column field="GP">
      <template #header> <div style="padding: 1rem">GP</div> </template></column
    >
    <column
      v-for="stat in STATS"
      :field="stat"
      :style="{ 'background-color': stat === selectedStat && 'rgba(159, 168, 218, 0.16)' }"
      role="stat-header"
    >
      <template #header="slotProps">
        <button @click="handleStatChange(slotProps.column.props.field)" class="stat-header-button">
          {{ stat }}
        </button>
      </template>
    </column>
  </DataTable>
  <ProgressSpinner v-else-if="fetchingData" style="width: 50px; height: 50px; display: flex; justify-content: center" />

  <p v-else>No data available</p>
</template>

<style scoped>
.table-options-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
}

.player-col {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.headshot-container {
  width: 50px;
}

.headshot-container img {
  width: 100%;
  border-radius: 50%;
}

.stat-header-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
}

:deep(.p-datatable-table .p-datatable-thead > tr > th) {
  padding: 0;
}

:deep(.p-datatable-table .p-column-header-content) {
  height: 100%;
}
</style>
