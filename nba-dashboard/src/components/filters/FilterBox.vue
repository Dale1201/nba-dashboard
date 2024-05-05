<script setup>
import Dropdown from "primevue/dropdown";
import NBA_SEASONS_YEARS from "../../utils/constants/nba-seasons";
import POSITIONS from "../../utils/constants/positions";
import ACCOLADES from "../../utils/constants/accolades";
import TEAMS from "../../utils/constants/teams";
import { defineModel, computed } from "vue";

const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
});

const filterOptions = {
  team: TEAMS,
  season: NBA_SEASONS_YEARS,
  position: POSITIONS,
  active: ["Yes", "No"],
  accolades: ACCOLADES,
};

const selectedFilter = defineModel("selectedFilter");
const selectedFilterOptions = computed(() => {
  return filterOptions[selectedFilter.value.value];
});

const selectedValues = defineModel("selectedValues");

const newFilters = computed(() => {
  if (!selectedFilter.value) return props.filters;

  return [...props.filters, selectedFilter.value];
});
</script>

<template>
  <div class="container">
    <Dropdown
      class="filter-dropdown"
      v-model="selectedFilter"
      :options="newFilters"
      optionLabel="name"
      placeholder="Select a filter"
    />
    <div class="filter-box">
      <p v-if="!selectedFilter">No filter selected</p>
      <p class="click-message" v-else-if="!selectedValues.length && selectedFilter">
        Click to add
      </p>
      <div v-else>{{ selectedFilterOptions }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: clamp(10rem, 20vw, 15rem);
}

.filter-box {
  border: 1px solid #ccc;
  display: grid;
  place-items: center;
  padding: 1rem;
  min-height: 8rem;
}

.filter-dropdown {
  border: none;
  background-color: transparent;
}

.click-message {
  font-weight: 100;
  font-style: italic;
}
</style>
