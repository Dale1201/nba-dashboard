<script setup></script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <router-link class="logo-container" to="/" >
        <div class="logo-img-container">
          <img src="/nba-logo.svg" alt="Logo" />
        </div>
        <h1>NBA Archive</h1>
      </router-link>
    </div>
    <div class="sidebar-menu-container">
      <router-link to="/season-stats" class="sidebar-menu-item">Seasons</router-link>
      <router-link to="/players" class="sidebar-menu-item">Players</router-link>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  height: 100%;
  width: 16rem;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #333;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #555;
  display: flex;
  justify-content: center;
}

.logo-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-family: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;

  h1 {
    font-size: 1.2rem;
    color: white;
  }
}

.logo-img-container {
  width: 1rem;

  img {
    width: 100%;
  }
}

.sidebar-menu-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}

.sidebar-menu-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.sidebar-menu-item:hover {
  background-color: #555;
}

.router-link-active {
  background-color: #555;
}
</style>
