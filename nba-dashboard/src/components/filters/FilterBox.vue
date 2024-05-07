<script setup>
import Dropdown from "primevue/dropdown";
import NBA_SEASONS_YEARS from "../../utils/constants/nba-seasons";
import POSITIONS from "../../utils/constants/positions";
import ACCOLADES from "../../utils/constants/accolades";
import TEAMS from "../../utils/constants/teams";
import { defineModel, computed } from "vue";
import TeamSelect from "./TeamSelect.vue";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
});
defineEmits(["removeFilter"]);

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

function handleFilterChange() {
  selectedValues.value = [];
}

function handleClicktoAdd(e) {
  if (selectedFilter.value.value === "team") {
    showTemplate(e);
    return;
  }
}

const confirm = useConfirm();
const showTemplate = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: "teams",
    accept: () => {
      console.log("Accepted");
    },
    reject: () => {
      console.log("Rejected");
    },
  });
};
</script>

<template>
  <div class="container">
    <div class="header">
      <Dropdown
        class="filter-dropdown"
        v-model="selectedFilter"
        @change="handleFilterChange"
        :options="newFilters"
        optionLabel="name"
        placeholder="Select a filter"
      />
      <Button
        class="minus-button"
        @click="$emit('removeFilter', selectedFilter)"
        icon="pi pi-times"
      />
    </div>
    <div class="filter-box" @click="handleClicktoAdd">
      <p v-if="!selectedFilter">No filter selected</p>
      <button class="click-message" v-else-if="!selectedValues.length && selectedFilter">
        Click to add
      </button>
      <div v-else>
        <div v-if="selectedFilter.value == 'team'">
          {{ selectedValues }}
        </div>
      </div>
    </div>
  </div>
  <ConfirmPopup class="filter-popup" group="teams">
    <template #message>
      <TeamSelect v-if="selectedFilter?.value === 'team'" v-model="selectedValues" />
    </template>
    <template #footer>yo </template>
  </ConfirmPopup>
</template>

<style scoped>
.container {
  width: clamp(10rem, 20vw, 15rem);
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.minus-button {
  background-color: transparent;
  color: var(--pink-100);
  vertical-align: middle;
  padding: 0;
}

:deep(.minus-button .pi) {
  font-size: 0.7rem;
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
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>

<style>
.filter-popup.p-confirm-popup .p-confirm-popup-footer {
  display: none !important;
}
</style>
