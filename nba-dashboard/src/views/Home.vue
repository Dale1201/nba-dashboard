<script setup></script>

<template>
  <div class="background"></div>
  <div class="content">
    <div class="actual-content">
      <div style="display: flex; gap: 1rem; align-items: center">
        <div class="nba-logo-container">
          <img src="/nba-logo.svg" alt="NBA Logo" />
        </div>
        <h1 class="text-shadow-text">NBA Archives</h1>
      </div>
      <i class="tag-line text-shadow-text">View NBA Stats: Past and Present</i>
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
.background {
  background: url("/jordan-background.webp") center/cover;
  filter: grayscale(100%) blur(5px);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
}

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
  padding: 3rem 5rem;
  border: 1px solid;
  box-shadow: inset 0 0 10px 0 white;
  border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
  animation: 8s rotate linear infinite;
}

.nba-logo-container {
  max-width: 1.5rem;

  img {
    width: 100%;
  }
}

.text-shadow-text {
  text-shadow: 2px 2px black;

}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  Button {
    width: 100%;
    text-align: center;
    /* color: white; */
    /* text-shadow: 1px 1px black; */
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
