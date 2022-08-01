import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import router from '@/routes';
import 'element-plus/dist/index.css';
import App from './App.vue';
import '@/assets/css/index.less';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount('#app');
