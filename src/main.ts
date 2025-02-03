import './assets/main.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);

app.mount('#app');
