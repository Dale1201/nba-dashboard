<script setup>
import Dialog from "primevue/dialog";
</script>

<template>
  <Dialog header="About Me" modal style="width: 60vw">
    <div>
      <p style="margin-top: 0">
        Hi my name is Dale! I'm a software engineer with a passion for anything
        programming and software. I love building web applications and learning new
        technologies. I'm currently working with Vue.js, Vite, and PrimeVue to build a web
        application that displays NBA statistics. I'm also learning DevOps, Webscraping
        and backend technologies such as Django and Go.
      </p>
      <p>
        I'm always looking for new opportunities to learn and grow as a developer. Feel
        free to reach out to me if you have any questions or just want to chat!
      </p>
      <p>Contact me at: dalecd9@gmail.com</p>
      <div class="links">
        <a
          href="https://www.linkedin.com/in/dale-beniga-800871175"
          target="_blank"
          rel="noopener noreferrer"
          >LinkedIn</a
        >
        <a href="https://github.com/Dale1201" target="_blank" rel="noopener noreferrer"
          >Github</a
        >
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.links {
  display: flex;
  justify-content: center;
  gap: 2rem;

  a {
    text-decoration: none;
    color: #007bff;
  }
}
</style>
