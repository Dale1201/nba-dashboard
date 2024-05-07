<script setup>
import SelectButton from "primevue/selectbutton";

const selectedValues = defineModel();
const positionOptions = [
  { label: "Guards", value: "G" },
  { label: "Forwards", value: "F" },
  { label: "Centers", value: "C" },
];
</script>

<template>
  <div class="positions-continer">
    <SelectButton
      v-model="selectedValues"
      :options="positionOptions"
      multiple
      optionLabel="label"
    />
  </div>
</template>
