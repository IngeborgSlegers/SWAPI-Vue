import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import { createApp } from "vue";
import App from "./App.vue";

import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: App },
    // { path: '/foo', component: Foo },
    // { path: '/bar', component: Bar },
  ],
})

const app = createApp(App)
app.use(router)

app.mount("#app");
