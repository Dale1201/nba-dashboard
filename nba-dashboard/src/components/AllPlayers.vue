<script setup>
import { computed, onMounted, ref, watch } from "vue";
import PlayerService from "../api/nba-api/player-service";
import TeamService from "../api/nba-api/team-service";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import getTeamLogo from "../utils/getTeamLogo";
import PlayerStatsModal from "./PlayerStatsModal.vue";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";
import ProgressSpinner from "primevue/progressspinner";
import SelectButton from "primevue/selectbutton";
import { teamCodeToId, teamIdToCode } from "../utils/translaters/teamCodeToId";
import ScrollPanel from "primevue/scrollpanel";
import FilterBox from "./filters/FilterBox.vue";

const players = ref([]);
const isLoading = ref(true);
onMounted(async () => {
  players.value = await PlayerService.getPlayers().finally(
    () => (isLoading.value = false)
  );
});

// Paginator logic

const playerSearch = ref("");

const displayPlayers = computed(() => {
  let res = players.value;
  if (playerSearch.value) {
    res = players.value.filter((player) =>
      player["Name"].toLowerCase().includes(playerSearch.value.toLowerCase())
    );
  }

  if (teamsSelected.value.length > 0) {
    res = res.filter((player) => {
      if (player["IsActive"]) {
        return teamsSelected.value.includes(teamCodeToId[player["Teams"].slice(-1)]);
      } else {
        return teamsSelected.value.some((teamId) =>
          player["Teams"].includes(teamIdToCode[teamId])
        );
      }
    });
  }

  if (selectedPositions.value.length > 0) {
    res = res.filter((player) =>
      selectedPositions.value.some((position) =>
        player["Position"].includes(position.value)
      )
    );
  }

  if (showActivePlayers.value) {
    res = res.filter((player) => player["IsActive"]);
  }
  return res;
});

// Modal logic
const selectedPlayer = ref({});
const isPlayerStatsModalVisible = ref(false);
function togglePlayerStatsModal(player) {
  selectedPlayer.value = player;
  isPlayerStatsModalVisible.value = !isPlayerStatsModalVisible.value;
}

const showTeams = ref(false);
const teamsSelected = ref([]);

function handleTeamLogoClick(teamId) {
  if (teamsSelected.value.includes(teamId)) {
    teamsSelected.value = teamsSelected.value.filter((id) => id !== teamId);
    return;
  }
  teamsSelected.value = [...teamsSelected.value, teamId];
}

// Active players filter logic
function handleFilterButtonClick(filter) {
  if (filter === "teams") {
    showTeams.value = !showTeams.value;
    showPositions.value = false;
  } else if (filter === "positions") {
    showPositions.value = !showPositions.value;
    showTeams.value = false;
  }
}

const showActivePlayers = ref(true);

// Position filter logic
const showPositions = ref(false);
const selectedPositions = ref([]);
const positionOptions = [
  { label: "Guards", value: "G" },
  { label: "Forwards", value: "F" },
  { label: "Centers", value: "C" },
];

function handleCloseFilterPositionClick(position) {
  selectedPositions.value = selectedPositions.value.filter(
    (pos) => pos.value !== position.value
  );
}

// Filter logic
const FILTER_OPTIONS = ref([
  { name: "Team", value: "team" },
  { name: "Season", value: "season" },
  { name: "Position", value: "position" },
  { name: "Active", value: "active" },
  { name: "Accolades", value: "accolades" },
]);

const availableFilterOptions = computed(() => {
  return FILTER_OPTIONS.value.filter((filter) => {
    return !filters.value.some((f) => f.selectedFilter?.value === filter.value);
  });
});

const filters = ref([]);
function handleAddFilterClick() {
  if (filters.value.length >= 5) {
    return;
  }
  filters.value.push({
    selectedFilter: null,
    selectedValues: [],
  });
}
</script>

<template>
  <div class="filter-buttons">
    <Button @click="handleAddFilterClick">Add Filter</Button>
    <Button @click="filters = []" class="clear-button">Clear</Button>
  </div>
  <div style="padding: 1rem"></div>

  <div class="filter-box-container">
    <FilterBox
      v-for="(filter, index) in filters"
      v-model:selectedFilter="filters[index].selectedFilter"
      v-model:selectedValues="filters[index].selectedValues"
      :filters="availableFilterOptions"
      @remove-filter="filters.splice(index, 1)"
      :key="filter.selectedFilter"
    />
  </div>
  <!-- <div class="filter-box-container">
    <div style="display: flex; align-items: center; gap: 1rem">
      <ToggleButton
        style="width: 6rem"
        v-model="showActivePlayers"
        onLabel="Active"
        offLabel="All Time"
      />
      <span>Filter By:</span>
      <Button
        @click="handleFilterButtonClick('teams')"
        class="filter-button"
        severity="info"
      >
        Team
        <Transition name="fade-container" mode="out-in">
          <div v-if="showTeams" class="triangle"></div>
        </Transition>
      </Button>
      <Button
        @click="handleFilterButtonClick('positions')"
        class="filter-button"
        severity="info"
      >
        Position
        <Transition name="fade-container" mode="out-in">
          <div v-if="showPositions" class="triangle"></div>
        </Transition>
      </Button>
    </div>
    <div class="search-clear-container">
      <Button :disabled="isClearFilterButtonDisabled" @click="clearFilters">Clear</Button>
    </div>
  </div>

  <Transition name="fade-container" mode="out-in">
    <div class="team-container" v-if="showTeams">
      <div v-for="team in teams" :key="team.id" @click="handleTeamLogoClick(team.id)">
        <div class="logo-container">
          <img
            :src="getTeamLogo(team.id)"
            onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
            alt="player image"
          />
        </div>
      </div>
    </div>
  </Transition>

  <Transition name="fade-container" mode="out-in">
    <div class="positions-continer" v-if="showPositions">
      <SelectButton
        v-model="selectedPositions"
        :options="positionOptions"
        multiple
        optionLabel="label"
      />
    </div>
  </Transition>

  <div class="filter-box" v-if="teamsSelected.length > 0 || selectedPositions.length > 0">
    <div
      @click="handleCloseFilterLogoClick(team)"
      class="filter-logo-container"
      v-for="team in teamsSelected"
    >
      <button class="close-filter-button">
        <p>x</p>
      </button>
      <img
        :src="getTeamLogo(team)"
        onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
        alt="player image"
      />
    </div>
    <div
      @click="handleCloseFilterPositionClick(position)"
      class="filter-position-container"
      v-for="position in selectedPositions"
    >
      <div>
        <button class="close-filter-button position-close-button">
          <p>x</p>
        </button>
        {{ position.label }}
      </div>
    </div>
  </div> -->

  <div style="padding: 1rem"></div>
  <ProgressSpinner
    v-if="isLoading"
    style="width: 50px; height: 50px; display: flex; justify-content: center"
  />
  <ScrollPanel class="players">
    <div class="player-search-container">
      <IconField iconPosition="left" style="width: fit-content">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText
          class="player-search-input"
          v-model="playerSearch"
          placeholder="Search"
        />
      </IconField>
    </div>
    <div style="padding: 1rem"></div>
    <div v-if="displayPlayers.length == 0">No Players Found</div>
    <div v-else class="players-container">
      <div
        class="player"
        v-for="player in displayPlayers"
        :key="player.id"
        @click="togglePlayerStatsModal(player)"
      >
        <div class="headshot-container">
          <img
            :src="getPlayerHeadshot(player.id)"
            onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
            alt="player image"
          />
        </div>
        <p class="player-name">{{ player["Name"] }}</p>
      </div>
    </div>
  </ScrollPanel>
  <p style="text-align: left">Showing {{ displayPlayers.length }} Players</p>
  <PlayerStatsModal
    v-model:visible="isPlayerStatsModalVisible"
    :player-id="Number(selectedPlayer.id)"
    :player-name="selectedPlayer['Name']"
    :key="Number(selectedPlayer.id) || 0"
  />
</template>

<style scoped>
.filter-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.clear-button {
  background-color: transparent;
  color: #9fa8da;
  border: 1px solid #9fa8da;
}

.filter-box-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
}

.search-clear-container {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding-right: 1.8rem;
}

.fade-container-enter-from,
.fade-container-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-container-enter-active {
  transition: opacity 0.4s ease-out, transform 0.3s ease-out;
}

.fade-container-leave-active {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}

.fade-container-enter-to,
.fade-container-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.team-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
  background-color: #9fa8da;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.minimise-box {
  border: none;
  cursor: pointer;
  width: 100%;
  background: transparent;
  font-size: 1rem;
  font-weight: lighter;
  border-radius: 4px;
  background-color: #8a97ee;
  padding-top: 0.5rem;
}

.positions-continer {
  margin-top: 1rem;
}

.headshot-container {
  transition: all 2s ease-in;
  width: clamp(4rem, 10vw, 6rem);

  img {
    width: 100%;
  }
}

.logo-container {
  max-width: clamp(2rem, 10vw, 5rem);
  transition: all 2s ease-in;

  img {
    width: 100%;
  }
}

.filter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.filter-logo-container {
  max-width: 4rem;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
  }
}

.filter-position-container {
  background-color: #9fa8da;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
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

.filter-button {
  position: relative;
  overflow: visible;
}
.filter-button:active,
.filter-button:focus {
  background-color: #90caf9;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #90caf9;
  position: absolute;
  bottom: -8px;
  left: 45%;
}

.player-search-container {
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 1;
}

.player-search-input {
  width: clamp(8rem, 50vw, 12rem);
}

.players {
  width: 100%;
  height: 500px;
}

:deep(.p-scrollpanel-wrapper) {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem 2rem;
}

:deep(.p-scrollpanel-content) {
  position: relative;
}

.players-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 2rem;
  column-gap: 3rem;
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: clamp(4rem, 10vw, 8rem);
}

.player:hover,
.logo-container:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: transform 0.3s;
}

.player-name {
  font-size: clamp(0.6rem, 2vw, 1rem);
  margin: 0;
}

@media (max-width: 768px) {
  .filter-box-container {
    justify-content: flex-start;
    gap: 1rem;
    padding-left: 1rem;
    flex-direction: column-reverse;
  }

  .players {
    gap: 1rem;
    padding-inline: 0.5rem;
  }

  .team-container {
    gap: 1rem;
  }
}
</style>
