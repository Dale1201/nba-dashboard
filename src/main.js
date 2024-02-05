import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ApiService from "./api/api-service";
import router from "./router";

ApiService.initialise();

const app = createApp(App);
app.use(router);
app.mount("#app");
