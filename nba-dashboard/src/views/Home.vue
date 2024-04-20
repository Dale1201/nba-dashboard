<script setup></script>

<template>
  <div class="background"></div>
  <div class="content">
    <div class="header-container">
      <div class="header-content">
        <div class="header-img-container">
          <div class="nba-logo-container">
            <img src="/nba-logo.svg" alt="NBA Logo" />
          </div>
          <h1 class="text-shadow-text">NBA Archives</h1>
        </div>
        <i class="tag-line text-shadow-text">View NBA Stats: Past and Present</i>
        <div style="padding: 0.5rem"></div>
      </div>
    </div>
    <div class="explore-container">
      <h2 class="text-shadow-text">Explore</h2>
      <div class="routers-buttons">
        <div class="season-leaders router-container">
          <router-link to="/season-stats">
            <Button>Season Leaders</Button>
          </router-link>
        </div>
        <div class="players router-container">
          <router-link to="/players">
            <Button>Player Archives</Button>
          </router-link>
        </div>
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
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 10vw, 10rem);
  padding: 2rem;
}

.header-container {
  display: flex;
  justify-content: center;
  height: fit-content;
  animation: 2s fadeIn, 1s 2s slideInFromBottom;
}

.header-content {
  --angle: 0deg;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 7rem;
  border: 1px solid;
  box-shadow: inset 0 0 10px 0 white;
  border-image: conic-gradient(
      from var(--angle),
      red,
      yellow,
      lime,
      aqua,
      blue,
      magenta,
      red
    )
    1;
  animation: 8s rotate linear infinite;
  width: fit-content;
  height: fit-content;
}

.header-img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  flex-wrap: wrap;
}

.nba-logo-container {
  width: 2rem;
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
  }
}

.routers-buttons {
  display: flex;
  justify-content: center;
  gap: 5rem;
  min-height: 18rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}

.router-container {
  width: 100%;
  min-width: 15rem;
  max-width: 20rem;
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  border-radius: 12px;

  a {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-decoration: none;
  }

  Button {
    background-color: transparent;
    color: white;
    text-shadow: 3px 3px black;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    min-height: 15rem;
  }
}

.router-container:hover {
  transform: scale(1.02);
  transition: transform 0.3s;
}

.season-leaders {
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.8)
    ),
    url("/wilt-chamberlain-100-point.webp") center/cover;
}
.players {
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.7)
    ),
    url("/lebron-kobe.webp") center/cover;
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

.explore-container {
  animation: 3s 2s fadeInExplore forwards;
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(100%);
  }
}
@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeInExplore {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
