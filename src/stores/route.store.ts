import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteLocationNormalizedGeneric } from "vue-router";

const useRouteStore = defineStore("route", () => {
  const intendedRoute = ref<RouteLocationNormalizedGeneric | null>(null);
  function setIntendedRoute(route: RouteLocationNormalizedGeneric | null) {
    intendedRoute.value = route;
  }
  return { intendedRoute, setIntendedRoute };
});

export default useRouteStore;
