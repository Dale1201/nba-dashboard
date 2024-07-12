<script setup>
import StatLeadersTable from "../components/StatLeadersTable.vue";
import StatPage from "../components/layout/StatPage.vue";
import Dropdown from "primevue/dropdown";
import NBA_SEASONS_YEARS from "../utils/constants/nba-seasons";
import SeasonAwards from "../components/SeasonAwards.vue";
import { ref } from "vue";

const selectedSeason = ref(NBA_SEASONS_YEARS[0]);
</script>

<template>
  <StatPage>
    <template #page-heading> Season Leaders </template>
    <div class="content">
      <div class="filter-container">
        <b>Season: </b>
        <Dropdown
          style="width: 10rem"
          v-model="selectedSeason"
          :options="NBA_SEASONS_YEARS"
        />
      </div>
      <SeasonAwards
        :selectedSeason="selectedSeason"
        v-if="selectedSeason !== NBA_SEASONS_YEARS[0] || selectedSeason === '2023-24'"
      />
      <div style="padding: 1rem"></div>
      <StatLeadersTable :selectedSeason="selectedSeason" />
    </div>
  </StatPage>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  max-width: 71rem;
  margin: 0 auto;
}

.filter-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
</style>
