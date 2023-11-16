import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import AppButton from "./components/AppButton.vue";
import MovieList from "./pages/MovieList.vue";

import "../style.css";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MovieList,
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: () => import("./pages/Movie.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.component("AppButton", AppButton);
app.use(router);
app.mount("#app");
