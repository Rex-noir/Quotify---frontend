import { createRouter, createWebHistory } from "vue-router";
import { LayoutNames } from "@/types/Layouts/layouts.types";
import PostViews from "@/views/Home/PostsView.vue";
import SignUpView from "@/views/Auth/SignUpView.vue";
import SplashView from "@/views/Splash/SplashView.vue";
import useUserStore from "@/stores/user.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quotify",
      component: SplashView,
      meta: { layout: LayoutNames.SPLASH },
    },
    {
      path: "/home",
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

//Router Guards
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name !== "quotify" && userStore.loading) {
    next({ name: "quotify" });
  } else {
    next();
  }
});

export default router;
