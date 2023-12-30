import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import { createStore, createLogger } from "vuex";
import { appModule, insertModule } from "./components/modules/index.js";
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

// eslint-disable-next-line no-undef
const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: { appModule, insertModule },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
