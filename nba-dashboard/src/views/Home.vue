<script setup>
import { router } from "websocket";
</script>

<template>
  <div class="content">
    <div class="actual-content">
      <div style="display: flex; gap: 1rem; align-items: center">
        <div class="nba-logo-container">
          <img src="/nba-logo.svg" alt="NBA Logo" />
        </div>
        <h1>NBA Archives</h1>
      </div>
      <i class="tag-line">View NBA Stats: Past and Present</i>
      <div style="padding: 1rem"></div>
      <div class="buttons-container">
        <router-link to="/season-stats">
          <Button>Seasons</Button>
        </router-link>
        <router-link to="/players">
          <Button>Players</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: grid;
  place-items: center;
  height: 100%;
}

.actual-content {
  --angle: 0deg;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid;
  border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
  animation: 8s rotate linear infinite;
}

.nba-logo-container {
  max-width: 1.5rem;

  img {
    width: 100%;
  }
}

/* .tag-line {
  font-weight: 100;
  font-size: 0.9rem;
} */

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  Button {
    width: 100%;
    text-align: center;
  }
}

@keyframes rotate {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
</style>
