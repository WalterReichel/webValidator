import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import cache from './utils/cache';
import plausible from './plugins/plausible';

const plausibleOptions = {
  domain: import.meta.env.PLAUSIBLE_DOMAIN,
  hashMode: true,
  trackLocalhost: false,
};

createApp(App).use(router).use(plausible, plausibleOptions).use(cache, { expires: 5 }).mount('#app');
