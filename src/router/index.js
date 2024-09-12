import { createRouter, createWebHistory } from "vue-router";
import { process } from "vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/player/:id",
    name: "Player",
    component: () => import("@/views/PlayerPage.vue"),
  },
  {
    path: "/movie/:id",
    name: "MoviePage",
    component: () => import("@/views/MoviePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
