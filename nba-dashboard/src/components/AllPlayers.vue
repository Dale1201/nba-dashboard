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

const PLAYERS_PER_PAGE = 20;

const players = ref([]);
const teams = ref("");
onMounted(async () => {
  players.value = await PlayerService.getPlayers();
  teams.value = await TeamService.getTeams();
});

// Paginator logic
const currentPage = ref(1);
async function onPageChange(event) {
  if (event.page < 1) {
    currentPage.value = 1;
    return;
  }
  currentPage.value = Math.min(event.page, Math.floor(players.value.length / PLAYERS_PER_PAGE));
}

const playerSearch = ref("");
const displayPlayers = computed(() => {
  const indexMin = (currentPage.value - 1) * PLAYERS_PER_PAGE;
  const indexMax = currentPage.value * PLAYERS_PER_PAGE;

  let res = players.value;
  if (playerSearch.value) {
    res = players.value.filter((player) =>
      player["DISPLAY_FIRST_LAST"].toLowerCase().includes(playerSearch.value.toLowerCase())
    );
  }

  if (teamSelected.value) {
    res = res.filter((player) => player["TEAM_ID"] == teamSelected.value);
  }
  return res.slice(indexMin, indexMax);
});

// Modal logic
const selectedPlayer = ref({});
const isPlayerStatsModalVisible = ref(false);
function togglePlayerStatsModal(player) {
  selectedPlayer.value = player;
  isPlayerStatsModalVisible.value = !isPlayerStatsModalVisible.value;
}

const showTeams = ref(false);
const teamSelected = ref();

function handleTeamLogoClick(teamId) {
  if (teamSelected.value == teamId) {
    teamSelected.value = null;
    return;
  }
  showTeams.value = false;
  teamSelected.value = teamId;
}
</script>

<template>
  <p>{{ playerSearch }}</p>
  <div style="display: flex; justify-content: flex-end; gap: 2rem;">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <span>Filter By:</span>
      <Button @click="showTeams = !showTeams">Teams</Button>
    </div>
    <IconField iconPosition="left" style="width: fit-content">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText v-model="playerSearch" placeholder="Search" />
    </IconField>
  </div>

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

  <div style="padding: 1rem"></div>
  <div v-if="!players || players.length == 0">No Players Found</div>
  <div class="players" v-else>
    <div
      class="player"
      v-for="player in displayPlayers"
      :key="player['PERSON_ID']"
      @click="togglePlayerStatsModal(player)"
    >
      <div class="headshot-container">
        <img
          :src="getPlayerHeadshot(player['PERSON_ID'])"
          onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
          alt="player image"
        />
      </div>
      <div>{{ player["DISPLAY_FIRST_LAST"] }}</div>
    </div>
  </div>
  <div style="padding: 2rem"></div>
  <div class="paginator-container" style="display: flex; justify-content: center; align-items: center">
    <button class="paginator-arrow" @click="onPageChange({ page: currentPage - 5 })">&lt&lt</button>
    <button class="paginator-arrow" @click="onPageChange({ page: currentPage - 1 })">&lt</button>
    <div class="paginator" v-if="currentPage <= 3">
      <div
        v-for="n in 5"
        class="paginator-number"
        :class="{ 'highlight-paginator-number': n == currentPage }"
        @click="onPageChange({ page: n })"
      >
        {{ n }}
      </div>
    </div>
    <div class="paginator" v-else>
      <div class="paginator-number" @click="onPageChange({ page: currentPage - 2 })">
        {{ currentPage - 2 }}
      </div>
      <div class="paginator-number" @click="onPageChange({ page: currentPage - 1 })">
        {{ currentPage - 1 }}
      </div>
      <div class="paginator-number highlight-paginator-number" @click="onPageChange({ page: currentPage })">
        {{ currentPage }}
      </div>
      <div class="paginator-number" @click="onPageChange({ page: currentPage + 1 })">
        {{ currentPage + 1 }}
      </div>
      <div class="paginator-number" @click="onPageChange({ page: currentPage + 2 })">
        {{ currentPage + 2 }}
      </div>
    </div>
    <button class="paginator-arrow" @click="onPageChange({ page: currentPage + 1 })">&gt</button>
    <button class="paginator-arrow" @click="onPageChange({ page: currentPage + 5 })">&gt&gt</button>
  </div>
  <PlayerStatsModal
    v-model:visible="isPlayerStatsModalVisible"
    :player-id="selectedPlayer['PERSON_ID']"
    :player-name="selectedPlayer['DISPLAY_FIRST_LAST']"
    :key="selectedPlayer['PERSON_ID']"
  />
</template>

<style scoped>
.team-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
}

.headshot-container {
  max-width: 8rem;

  img {
    width: 100%;
  }
}

.logo-container {
  max-width: 5rem;

  img {
    width: 100%;
  }
}

.players {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
}

.player:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: transform 0.3s;
}

.paginator {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.highlight-paginator-number {
  background-color: #7989ff;
  border-radius: 50%;
  border: none;
}

.paginator-number {
  display: grid;
  place-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.paginator-arrow {
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  margin-inline: 0.5rem;
  cursor: pointer;
}
</style>
