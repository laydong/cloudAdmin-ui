import { createApp } from 'vue';
import pinia from '/src/stores';
import App from './App.vue';
import router from './router';
import { directive } from '/src/directive';
import { i18n } from '/src/i18n';
import other from '/src/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/src/theme/index.scss';
import VueGridLayout from 'vue-grid-layout';

const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).mount('#app');
