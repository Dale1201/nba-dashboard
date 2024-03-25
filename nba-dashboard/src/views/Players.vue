<script setup>
import AllPlayers from "../components/AllPlayers.vue";
</script>

<template>
  <div class="page-content">
    <h1 style="margin-top: 0">Player Archives</h1>

    <AllPlayers />
    <div style="padding: 2rem"></div>
    <Button>Compare Players</Button>
  </div>
</template>

<style scoped>
.page-content {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
