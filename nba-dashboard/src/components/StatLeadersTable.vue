<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import STATS from "../utils/constants/stats";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import SeasonService from "../api/nba-api/season-service";
import Dropdown from "primevue/dropdown";
import ProgressSpinner from "primevue/progressspinner";
import PlayerStatsModal from "./PlayerStatsModal.vue";

const props = defineProps(["selectedSeason"]);

watch(
  () => props.selectedSeason,
  () => {
    fetchStatLeaders();
  }
);

const selectedStat = ref("PTS");
const statLeaders = ref([]);
const fetchingData = ref(false);

onMounted(async () => {
  fetchingData.value = true;
  statLeaders.value = await SeasonService.getRegStatLeaders(selectedStat.value);
  fetchingData.value = false;
});

onUnmounted(() => {
  statLeaders.value = [];
  selectedStat.value = "PTS";
});

async function fetchStatLeaders() {
  statLeaders.value = [];

  fetchingData.value = true;
  if (showPlayoffLeaders.value) {
    statLeaders.value = await SeasonService.getPlayoffsStatLeaders(
      selectedStat.value,
      props.selectedSeason
    );
  } else {
    statLeaders.value = await SeasonService.getRegStatLeaders(
      selectedStat.value,
      props.selectedSeason
    );
  }
  fetchingData.value = false;
}

async function handleStatChange(stat) {
  if (!stat) return;
  selectedStat.value = stat;
}

const showPlayoffLeaders = ref(false);
const seasonModes = [
  { label: "Regular Season", value: "Regular Season" },
  { label: "Playoffs", value: "Playoffs" },
];
const selectedSeasonMode = ref({ label: "Regular Season", value: "Regular Season" });

function handleSeasonModeChange() {
  if (selectedSeasonMode.value.value === "Playoffs") {
    showPlayoffLeaders.value = true;
  } else {
    showPlayoffLeaders.value = false;
  }
  fetchStatLeaders();
}

const displayStatLeaders = computed(() => {
  if (!statLeaders.value.length) return [];
  return statLeaders.value
    .sort((a, b) => b[selectedStat.value] - a[selectedStat.value])
    .map((player, index) => ({ ...player, RANK: index + 1 }));
});

const selectedPlayer = ref({});
const isPlayerStatsModalVisible = ref(false);
function handlePlayerClick(player) {
  selectedPlayer.value = player;
  isPlayerStatsModalVisible.value = true;
}
</script>

<template>
  <div class="stat-leaders-content">
    <h2 style="text-align: left">Stat Leaders</h2>
    <div class="table-options-container">
      <Dropdown
        style="width: 12rem"
        v-model="selectedSeasonMode"
        :options="seasonModes"
        option-label="label"
        @change="handleSeasonModeChange"
      />
    </div>
    <div style="padding: 1rem"></div>

    <DataTable
      v-if="statLeaders.length"
      class="stat-leader-table"
      :value="displayStatLeaders"
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
          <div class="player-col" @click="handlePlayerClick(slotProps.data)">
            <div class="headshot-container">
              <img
                :src="getPlayerHeadshot(slotProps.data.PLAYER_ID)"
                alt="Player Headshot"
                onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
              />
            </div>
            <p class="player-text">{{ slotProps.data.PLAYER }}</p>
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
        :style="{
          'background-color': stat === selectedStat && 'rgba(159, 168, 218, 0.16)',
        }"
        role="stat-header"
      >
        <template #header="slotProps">
          <button
            @click="handleStatChange(slotProps.column.props.field)"
            class="stat-header-button"
          >
            {{ stat }}
          </button>
        </template>
      </column>
    </DataTable>
    <ProgressSpinner
      v-else-if="fetchingData"
      style="width: 50px; height: 50px; display: flex; justify-content: center"
    />

    <p v-else>No data available</p>
  </div>
  <PlayerStatsModal
    v-model:visible="isPlayerStatsModalVisible"
    :player-id="selectedPlayer['PLAYER_ID']"
    :player-name="selectedPlayer['PLAYER']"
    :key="selectedPlayer['PLAYER_ID'] || 0"
  />
</template>

<style scoped>
.stat-leaders-content {
  padding: 1rem;
  min-width: 71rem;
  background-color: #1e1e1e;
}

.table-options-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4rem;
}

.player-col {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.headshot-container {
  width: 50px;
}

.headshot-container img {
  width: 100%;
  border-radius: 50%;
}

.player-text {
  text-decoration: underline;
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
