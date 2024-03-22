import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Players from "./views/Players.vue";
import SeasonStats from "./views/SeasonStats.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/players",
      name: "players",
      component: Players,
    },
    {
      path: "/season-stats",
      name: "season-stats",
      component: SeasonStats,
    },
  ],
});

export default router;