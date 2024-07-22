<script setup lang="ts">
import Button from "primevue/button";
import Menu from "@/views/Menu/Menu.vue";
import useLayoutStore from "@/stores/layouts.store";
import { LayoutNames } from "@/types/Layouts/layouts.types";
import { onMounted } from "vue";

const useLayout = useLayoutStore();
onMounted(() => {
  useLayout.notifyLayoutLoaded();
});
</script>
<template>
  <div>
    <div class="fixed top-0 z-10 flex w-full items-center justify-between p-2 px-3">
      <div class="prose flex items-center gap-4 font-bold dark:prose-invert">
        <span
          @click="useLayout.changeLayout(LayoutNames.HOME)"
          class="pi pi-arrow-left text-lg"
        ></span>
        <h1 class="text-xl">Menu</h1>
      </div>
      <div>
        <Button outlined class="border-none" icon="pi pi-search" />
      </div>
    </div>
    <Menu />
  </div>
</template>
