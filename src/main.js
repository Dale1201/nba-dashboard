import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ApiService from './api/api-service'

ApiService.initialise()
createApp(App).mount('#app')
