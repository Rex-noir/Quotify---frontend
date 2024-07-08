import { createRouter, createWebHistory } from "vue-router";
import { LayoutNames } from "@/types/Layouts/layouts.types";
import PostViews from "@/views/Home/PostsView.vue";
import SignUpView from "@/views/Auth/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PostViews,
      meta: { layout: LayoutNames.HOME },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
      meta: { layout: LayoutNames.AUTH },
    },
  ],
});

export default router;
