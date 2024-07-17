import { createRouter, createWebHistory } from "vue-router";
import { LayoutNames } from "@/types/Layouts/layouts.types";
import PostListView from "@/views/Home/PostListView.vue";
import SplashView from "@/views/Splash/SplashView.vue";
import useUserStore from "@/stores/user.store";
import useRouteStore from "@/stores/route.store";

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
      component: PostListView,
      meta: { layout: LayoutNames.HOME },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Auth/SignUpView.vue"),
      meta: { layout: LayoutNames.AUTH },
    },
    {
      path: "/quotes/:id",
      name: "viewQuote",
      component: () => import("@/views/Quote/QuoteView.vue"),
      meta: { layout: LayoutNames.HOME },
    },
    {
      path: "/quotes/:post_id/comments/:comment_id/replies",
      name: "Replies",
      component: () => import("@/Layouts/NestedComments.vue"),
      meta: { layout: LayoutNames.HOME },
    },
  ],
});

//Router Guards
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const routeStore = useRouteStore();

  if (userStore.loading) {
    if (to.name !== "quotify") {
      routeStore.setIntendedRoute(to);
      next({ name: "quotify", replace: true });
    } else {
      next();
    }
  } else {
    const intendedRoute = routeStore.intendedRoute;
    if (to.name === "quotify" && intendedRoute) {
      routeStore.setIntendedRoute(null);
      next(intendedRoute);
    } else {
      next();
    }
  }
});

export default router;
