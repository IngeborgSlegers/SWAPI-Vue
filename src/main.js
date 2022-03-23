import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import Name from "./components/SWAPI/NameDisplayComponent.vue";
import Insert from "./components/SWAPI/InsertComponent.vue";
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
  ],
});

const app = createApp(App).use(router);
app.mount("#app");
