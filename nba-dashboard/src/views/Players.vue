<script setup>
import AllPlayers from "../components/AllPlayers.vue";
import StatPage from "../components/layout/StatPage.vue";
</script>

<template>
  <StatPage>
    <template #page-heading> Player Archives </template>
    <AllPlayers />
    <div style="padding: 2rem"></div>
  </StatPage>
</template>

<style scoped></style>
