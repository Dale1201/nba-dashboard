<script setup>
import { onMounted, ref } from "vue";
import SeasonService from "../api/nba-api/season-service";
import SelectButton from "primevue/selectbutton";
import ToggleButton from "primevue/togglebutton";
import StatLeadersTable from "../components/StatLeadersTable.vue";
import STATS from "../utils/constants/stats";

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
async function handleToggleStat(e) {
  fetchStatLeaders();
}
</script>

<template>
  <h1>Season Leaders</h1>

  <div class="table-options-container">
    <ToggleButton
      style="width: 10rem"
      v-model="showTotal"
      @change="handleToggleStat"
      onLabel="Total"
      offLabel="Per Game"
    />
    <SelectButton v-model="selectedStat" :options="STATS" @change="handleStatChange" />
  </div>

  <div style="padding: 1rem"></div>

  <StatLeadersTable :selectedStat="selectedStat" :statLeaders="statLeaders" />
</template>

<style scoped>
.table-options-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
}
</style>
