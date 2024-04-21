<script setup>
import SeasonService from "../api/nba-api/season-service";
import { ref, onMounted, watch, computed } from "vue";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";
import PlayerStatsModal from "./PlayerStatsModal.vue";

const props = defineProps(["selectedSeason"]);

const fetchingData = ref(false);
const awardWinners = ref({});
onMounted(async () => {
  fetchingData.value = true;
  awardWinners.value = await SeasonService.getAwardWinners(props.selectedSeason);
  fetchingData.value = false;
});

const visibleAwards = ref(["MVP", "DPOY", "6MOY", "ROY", "MIP", "FMVP"]);

watch(
  () => props.selectedSeason,
  () => {
    fetchAwardWinners();
  }
);

const displayAwardWinners = computed(() => {
  const display = {};
  for (const award in awardWinners.value) {
    if (visibleAwards.value.includes(award)) {
      display[award] = awardWinners.value[award];
    }
  }
  return display;
});

async function fetchAwardWinners() {
  awardWinners.value = {};
  fetchingData.value = true;
  awardWinners.value = await SeasonService.getAwardWinners(props.selectedSeason);
  fetchingData.value = false;
}

const isPlayerStatsModalVisible = ref(false);
const selectedPlayer = ref({});

function openPlayerStatsModal(player) {
  selectedPlayer.value = player;
  isPlayerStatsModalVisible.value = true;
}
</script>

<template>
  <div
    class="award-winners-content"
    v-if="Object.keys(displayAwardWinners).length > 0 && !fetchingData"
  >
    <h2 style="text-align: left">Award Winners</h2>
    <div class="award-winners">
      <div
        v-for="(winner, award) in displayAwardWinners"
        @click="openPlayerStatsModal(winner)"
        style="cursor: pointer"
      >
        <div class="award-circle">
          <div class="award-headshot-container">
            <img
              :src="getPlayerHeadshot(winner['player_id'])"
              alt="award"
              onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
            />
          </div>
          <p>{{ winner.player }}</p>
          <h3>{{ award }}</h3>
        </div>
      </div>
    </div>
  </div>
  <PlayerStatsModal
    v-model:visible="isPlayerStatsModalVisible"
    :player-id="selectedPlayer['player_id']"
    :player-name="selectedPlayer['player']"
    :key="selectedPlayer['player_id'] || 0"
  />
</template>

<style scoped>
.award-winners-content {
  padding: 1rem;
  padding-right: 0;
  background-color: #1e1e1e;
}

.award-winners {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.award-headshot-container {
  max-width: 6rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
}

.award-circle {
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 0.8rem;
  }
}
</style>
