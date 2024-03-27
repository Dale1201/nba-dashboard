<script setup>
import Dialog from "primevue/dialog";
</script>

<template>
  <Dialog header="About Me" modal style="width: 60vw">
    <div>
      <p style="margin-top: 0">
        Hi! I'm a software engineer with a passion for web development. I love building web applications and learning
        new technologies. I'm currently working with Vue.js, Vite, and PrimeVue to build a web application that displays
        NBA statistics. I'm also learning about serverless technologies and cloud computing.
      </p>
      <p>
        I'm always looking for new opportunities to learn and grow as a developer. Feel free to reach out to me if you
        have any questions or just want to chat!
      </p>
      <p>
        Contact me at: dalecd9@gmail.com
      </p>
      <div class="links">
        <a href="https://www.linkedin.com/in/dale-beniga-800871175">LinkedIn</a>
        <a href="https://github.com/Dale1201">Github</a>
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
