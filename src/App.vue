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
  <Toast position="bottom-center">
    <template #container="{ message, closeCallback }">
      <div class="prose flex max-w-none justify-center py-2 dark:prose-invert">
        <span class="text-center text-base font-bold">
          {{ message.detail }}</span
        >
      </div>
    </template></Toast
  >
  <component :is="layoutStore.currentLayout" />
</template>
<style>
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
