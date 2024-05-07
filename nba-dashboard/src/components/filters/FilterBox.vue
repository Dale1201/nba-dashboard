<script setup>
import Dropdown from "primevue/dropdown";
import { defineModel, computed } from "vue";
import TeamSelect from "./TeamSelect.vue";
import PositionSelect from "./PositionSelect.vue";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import getTeamLogo from "../../utils/getTeamLogo";
import ActiveSelect from "./ActiveSelect.vue";

const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
});
defineEmits(["removeFilter"]);

const selectedFilter = defineModel("selectedFilter");
const selectedValues = defineModel("selectedValues");

const newFilters = computed(() => {
  if (!selectedFilter.value) return props.filters;

  return [...props.filters, selectedFilter.value];
});

function handleFilterChange() {
  selectedValues.value = [];
}

function handleClicktoAdd(e) {
  showTemplate(e);
}

const confirm = useConfirm();
const showTemplate = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: selectedFilter.value.value,
    accept: () => {
      console.log("Accepted");
    },
    reject: () => {
      console.log("Rejected");
    },
  });
};

function removeFilterValue(val) {
  selectedValues.value = selectedValues.value.filter((v) => v !== val);
}
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
      <div v-else class="filter-values-container">
        <div v-for="val in selectedValues">
          <div
            v-if="selectedFilter?.value == 'team'"
            @click.stop="removeFilterValue(val)"
            class="team-logo"
          >
            <button class="close-filter-button">
              <p>x</p>
            </button>
            <img
              :src="getTeamLogo(val)"
              onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
              alt="player image"
            />
          </div>
          <div
            v-else-if="
              selectedFilter?.value == 'position' || selectedFilter?.value == 'active'
            "
            class="position"
            @click.stop="removeFilterValue(val)"
          >
            <button class="close-filter-button position-close-button">
              <p>x</p>
            </button>
            {{ val?.label || val }}
          </div>
          <div v-else>
            <p>{{ val }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmPopup class="filter-popup" :group="selectedFilter?.value">
    <template #message>
      <TeamSelect v-if="selectedFilter?.value === 'team'" v-model="selectedValues" />
      <PositionSelect
        v-else-if="selectedFilter?.value === 'position'"
        v-model="selectedValues"
      />
      <ActiveSelect
        v-else-if="selectedFilter?.value === 'active'"
        v-model="selectedValues"
      />
    </template>
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

.filter-values-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.team-logo {
  max-width: clamp(2rem, 3vw, 3.5rem);

  position: relative;
  cursor: pointer;
  img {
    width: 100%;
  }
}

.position {
  background-color: #9fa8da;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
  font-size: 0.8rem;
}

.close-filter-button {
  position: absolute;
  right: 0;
  font-size: 0.7rem;
  height: 0.8rem;
  width: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7979;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding-bottom: 2px;
}

.position-close-button {
  top: 0.2rem;
  right: 0.1rem;
}
</style>

<style>
.filter-popup.p-confirm-popup .p-confirm-popup-footer {
  display: none !important;
}
</style>
