<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import STATS from "../utils/constants/stats";

const props = defineProps({
  selectedStat: String,
  statLeaders: Array,
});
</script>

<template>
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
