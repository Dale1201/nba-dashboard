<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import STATS from "../utils/constants/stats";
import { onMounted, ref } from "vue";
import SeasonService from "../api/nba-api/season-service";
import SelectButton from "primevue/selectbutton";
import ToggleButton from "primevue/togglebutton";

const selectedStat = ref("PTS");
const statLeaders = ref([]);
onMounted(async () => {
  statLeaders.value = await SeasonService.getPerGameStatLeaders(selectedStat.value);
});

async function fetchStatLeaders() {
  statLeaders.value = [];
  if (showTotal.value) {
    statLeaders.value = await SeasonService.getTotalStatLeaders(selectedStat.value);
  } else {
    statLeaders.value = await SeasonService.getPerGameStatLeaders(selectedStat.value);
  }
}

async function handleStatChange(e) {
  if (!e) return;

  fetchStatLeaders();
}

const showTotal = ref(false);
</script>

<template>
  <div class="table-options-container">
    <ToggleButton
      style="width: 10rem"
      v-model="showTotal"
      @change="fetchStatLeaders"
      onLabel="Total"
      offLabel="Per Game"
    />
    <SelectButton v-model="selectedStat" :options="STATS" @change="handleStatChange" />
  </div>

  <div style="padding: 1rem"></div>

  <DataTable :value="statLeaders" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" :key="selectedStat">
    <column field="RANK" header="Rank"></column>
    <column field="PLAYER" header="Player">
      <template #body="slotProps">
        <div class="player-col">
          <div class="headshot-container">
            <img :src="getPlayerHeadshot(slotProps.data.PLAYER_ID)" alt="Player Headshot" />
          </div>
          <p>{{ slotProps.data.PLAYER }}</p>
        </div>
      </template>
    </column>
    <column field="TEAM" header="Team"></column>
    <column
      v-for="stat in STATS"
      :field="stat"
      :header="stat"
      :style="{ 'background-color': stat === selectedStat && 'rgba(159, 168, 218, 0.16)' }"
    >
    </column>
  </DataTable>
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
</style>
