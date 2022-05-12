import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import cache from './utils/cache';

createApp(App).use(router).use(cache, { expires: 5 }).mount('#app');
