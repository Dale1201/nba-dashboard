import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ApiService from "./api/api-service";
import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/md-dark-indigo/theme.css";
import Button from "primevue/button";
import 'primeicons/primeicons.css'


ApiService.initialise();

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.component("Button", Button);
app.mount("#app");
