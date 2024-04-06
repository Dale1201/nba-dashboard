<script setup>
import SeasonService from "../api/nba-api/season-service";
import { ref, onMounted, watch } from "vue";
import getPlayerHeadshot from "../utils/getPlayerHeadshot";

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

async function fetchAwardWinners() {
  awardWinners.value = {};
  fetchingData.value = true;
  awardWinners.value = await SeasonService.getAwardWinners(props.selectedSeason);
  fetchingData.value = false;
}
</script>

<template>
  <div class="award-winners-content">
    <h2 style="text-align: left">Award Winners</h2>
    <div class="award-winners">
      <div v-for="(winner, award) in awardWinners">
        <div v-if="visibleAwards.includes(award)" class="award-circle">
          <div class="award-headshot-container">
            <img :src="getPlayerHeadshot(winner['player_id'])" alt="award" />
          </div>
          <p>{{ winner.player }}</p>
          <h3>{{ award }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.award-winners-content {
  padding: 1rem 1rem 2rem 1rem;
  background-color: #1e1e1e;
}

.award-winners {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
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
