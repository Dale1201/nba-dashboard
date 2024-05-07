<script setup>
import SelectButton from "primevue/selectbutton";

const selectedValues = defineModel();
const options = ["Active", "Retired"];
</script>

<template>
  <div class="positions-continer">
    <SelectButton v-model="selectedValues" :options="options" multiple />
  </div>
</template>
