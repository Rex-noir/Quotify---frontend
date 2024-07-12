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
      <div class="prose p-3 dark:prose-invert">
        <span class="text-center text-base font-bold">
          {{ message.detail }}</span
        >
      </div>
    </template></Toast
  >
  <router-view v-slot="{ Component, route }">
    <keep-alive include="HomeLayout">
      <component :is="layoutStore.currentLayout" />
    </keep-alive>
  </router-view>
</template>
