<script setup>
import { computed, onMounted, ref } from "vue";
import SeasonService from "../api/nba-api/season-service";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import SelectButton from "primevue/selectbutton";

const STATS = ["PTS", "REB", "AST", "STL", "BLK", "FG_PCT", "FG3_PCT", "FT_PCT", "TOV"];

const selectedStat = ref("PTS");
const statLeaders = ref([]);
onMounted(async () => {
  statLeaders.value = await SeasonService.getStatLeaders(selectedStat.value);
});

const otherStats = computed(() => STATS.filter((stat) => stat !== selectedStat.value));

async function handleStatChange(e) {
  if (!e) return;

  statLeaders.value = [];
  statLeaders.value = await SeasonService.getStatLeaders(selectedStat.value);
}
</script>

<template>
  <h1>Season Leaders</h1>
  <SelectButton v-model="selectedStat" :options="STATS" @change="handleStatChange" />

  <div style="padding: 1rem"></div>

  <DataTable :value="statLeaders" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" :key="selectedStat">
    <column field="RANK" header="Rank"></column>
    <column field="PLAYER" header="Player"></column>
    <column field="TEAM" header="Team"></column>
    <column v-for="stat in STATS" :field="stat" :header="stat" :style="{'background-color': stat === selectedStat && 'rgba(159, 168, 218, 0.16)'}"></column>
  </DataTable>
</template>

<style scoped>

</style>
