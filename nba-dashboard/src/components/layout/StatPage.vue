<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";

const sidebarExpanded = ref(true);
</script>

<template>
  <Transition name="sidebar">
    <Sidebar v-if="sidebarExpanded" />
  </Transition>

  <div class="page-content-wrapper" :class="{ 'margin-left-0': !sidebarExpanded }">
    <!-- <div> -->
    <div class="header">
      <Button @click="sidebarExpanded = !sidebarExpanded" icon="pi pi-bars" class="hamburger-button" />
      <h1 class="page-heading"><slot name="page-heading" /></h1>
    </div>
    <div class="page-content">
      <slot />
    </div>
    <!-- </div> -->
  </div>
</template>

<style scoped>
.page-content-wrapper {
  margin-left: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: margin-left 0.2s;
  padding: 2rem;
}

.page-content {
  max-width: 1280px;
}

.margin-left-0 {
  margin-left: 0;
}

.header {
  height: 50px;
  width: 100%;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.page-heading {
  margin: 0;
  font-size: 1.5rem;
}

.hamburger-button {
  background: transparent;
  color: white;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.2s ease-in-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0);
}
</style>
