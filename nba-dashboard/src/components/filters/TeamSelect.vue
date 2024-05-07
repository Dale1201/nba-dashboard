<script setup>
import TEAMS from "../../utils/constants/teams";
import getTeamLogo from "../../utils/getTeamLogo";

const selectedValues = defineModel();

function handleTeamLogoClick(teamId) {
  if (selectedValues.value.includes(teamId)) {
    selectedValues.value = selectedValues.value.filter((id) => id !== teamId);
    return;
  }
  selectedValues.value = [...selectedValues.value, teamId];
}
</script>

<template>
  <!-- <Transition name="fade-container" mode="out-in"> -->
  <div class="team-container">
    <div v-for="team in TEAMS" :key="team.id" @click="handleTeamLogoClick(team.id)">
      <div class="logo-container">
        <img
          :src="getTeamLogo(team.id)"
          onerror="if (this.src != 'default.PNG') this.src = '/player-headshots/default.PNG'"
          alt="player image"
        />
      </div>
    </div>
  </div>
  <!-- </Transition> -->
</template>

<style scoped>
.team-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  background-color: #9fa8da;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
  max-width: 40rem;
}

.logo-container {
  max-width: clamp(2rem, 3vw, 3.5rem);
  transition: all 2s ease-in;

  img {
    width: 100%;
  }
}
</style>
