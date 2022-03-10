import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import Name from "./components/SWAPI/Name.vue";
import Something from "./components/SWAPI/Something.vue";
import Insert from "./components/SWAPI/Insert.vue";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "/:swapiValue",
          component: Name,
          name: "swapiValue",
          children: [
            {
              name: "details",
              path: ":details",
              component: Insert,
            },
          ],
        },
      ],
    },
    // { path: "/something", component: Something },
    // { path: '/bar', component: Bar },
  ],
});

const app = createApp(App).use(router);
app.mount("#app");
