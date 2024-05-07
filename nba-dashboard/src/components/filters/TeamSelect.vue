<script setup>
import TEAMS from "../../utils/constants/teams";
import getTeamLogo from "../../utils/getTeamLogo";

const selectedValues = defineModel();
const handleTeamLogoClick = (teamId) => {
  console.log(selectedValues.value);
  selectedValues.value.push(teamId);
};
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
  gap: 2rem;
  background-color: #9fa8da;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.logo-container {
  max-width: clamp(2rem, 10vw, 5rem);
  transition: all 2s ease-in;

  img {
    width: 100%;
  }
}
</style>
