import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import stores from './stores';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

loadFonts()

const app = createApp(App);

app.component('EasyDataTable', Vue3EasyDataTable);

app.use(router);
app.use(stores);
app.use(vuetify);


app.mount('#app');
