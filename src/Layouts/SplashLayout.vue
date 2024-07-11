<script setup lang="ts">
import useRouteStore from "@/stores/route.store";
import useUserStore from "@/stores/user.store";
import SplashView from "@/views/Splash/SplashView.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const routeStore = useRouteStore();

const navigateToIntendedRoute = () => {
  const intendedRoute = routeStore.intendedRoute;
  if (intendedRoute && intendedRoute.path !== "/") {
    routeStore.setIntendedRoute(null); // Clear the intended route
    router.push(intendedRoute);
  } else {
    router.push({ name: "home" });
  }
};

watch(
  () => userStore.loading,
  (newLoading, oldLoading) => {
    if (oldLoading && !newLoading) {
      navigateToIntendedRoute();
    }
  },
);

if (!userStore.loading) {
  navigateToIntendedRoute();
}
</script>
<template>
  <SplashView></SplashView>
</template>
