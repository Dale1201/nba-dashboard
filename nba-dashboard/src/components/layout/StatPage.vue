<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import AboutMeModal from "../AboutMeModal.vue";

const sidebarExpanded = ref(false);

const aboutMeModalVisible = ref(false);
function showAboutMeModal() {
  aboutMeModalVisible.value = true;
}
</script>

<template>
  <Transition name="sidebar">
    <Sidebar v-if="sidebarExpanded" />
  </Transition>

  <div class="page-content-wrapper" :class="{ 'margin-left-0': !sidebarExpanded }">
    <div class="header">
      <div class="header-heading">
        <Button
          @click="sidebarExpanded = !sidebarExpanded"
          icon="pi pi-bars"
          class="hamburger-button"
        />
        <h1 class="page-heading"><slot name="page-heading" /></h1>
      </div>
      <div class="logo-container" @click="showAboutMeModal">
        <img src="/db-logo.svg" alt="about me" />
      </div>
    </div>
    <div class="page-content">
      <slot />
    </div>
  </div>
  <AboutMeModal v-model:visible="aboutMeModalVisible" />
</template>

<style scoped>
.page-content-wrapper {
  margin-left: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: margin-left 0.2s;
  padding: 1rem 2rem 2rem 2rem;
}

.page-content {
  max-width: 1280px;
  width: 100%;
}

.margin-left-0 {
  margin-left: 0;
}

.header {
  /* height: 50px; */
  width: 100%;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-heading {
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

.logo-container {
  width: 3rem;

  img {
    width: 100%;
  }
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
