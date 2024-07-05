import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { LayoutNames } from "@/types/Layouts/layouts.types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { layout: LayoutNames.HOME },
    },
  ],
});

export default router;
