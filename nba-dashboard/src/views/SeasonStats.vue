<script setup>
import StatLeadersTable from "../components/StatLeadersTable.vue";
import StatPage from "../components/layout/StatPage.vue";
</script>

<template>
  <StatPage>
    <template #page-heading> Season Stats </template>
    <StatLeadersTable />
  </StatPage>
</template>

<style scoped></style>
