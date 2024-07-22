<script setup lang="ts">
import useLayoutStore from "./stores/layouts.store";
import router from "./router";
import type { LayoutNames } from "./types/Layouts/layouts.types";
import Toast from "primevue/toast";
import ProgressBar from "primevue/progressbar";

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
  <div>
    <ProgressBar
      v-if="layoutStore.showProgressBar"
      mode="indeterminate"
      class="fixed left-0 top-0 z-50 w-full"
      style="height: 3px"
    ></ProgressBar>
    <component :is="layoutStore.currentLayout" />
  </div>
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
