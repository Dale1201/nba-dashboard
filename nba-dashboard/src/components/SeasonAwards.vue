<script setup>
import SeasonService from "../api/nba-api/season-service";
import { ref, onMounted, watch } from "vue";

const props = defineProps(["selectedSeason"]);

const fetchingData = ref(false);
const awardWinners = ref({});
onMounted(async () => {
  fetchingData.value = true;
  awardWinners.value = await SeasonService.getAwardWinners(props.selectedSeason);
  fetchingData.value = false;
});

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
  <div class="award-winners">
    <div v-for="(name, award) in awardWinners" class="award-circle">
      <p>{{ name }}</p>
      <h3>{{ award }}</h3>
    </div>
  </div>
</template>


<style scoped>
.award-winners {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
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
  }
}
</style>