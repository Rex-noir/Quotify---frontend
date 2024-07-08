<script setup lang="ts">
import useLayoutStore from "./stores/layouts.store";
import router from "./router";
import type { LayoutNames } from "./types/Layouts/layouts.types";
import Toast from "primevue/toast";

const layoutStore = useLayoutStore();
router.afterEach((to) => {
  layoutStore.changeLayout(to.meta.layout as LayoutNames);
});
</script>

<template>
  <Toast position="bottom-center" />
  <component :is="layoutStore.currentLayout" />
</template>
