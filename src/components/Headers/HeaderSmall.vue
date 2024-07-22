<script setup lang="ts">
import Button from "primevue/button";
import HeaderTabs from "./HeaderTabs.vue";
import useLayoutStore from "@/stores/layouts.store";
import { LayoutNames } from "@/types/Layouts/layouts.types";

const useLayout = useLayoutStore();
</script>
<template>
  <div class="">
    <div class="grid grid-cols-3 md:grid-cols-[5fr,1fr,80px]">
      <div
        class="col-span-2 col-start-1 flex h-full w-full flex-col justify-center p-2 md:col-start-2 md:items-center"
      >
        <span class="font-display text-2xl font-bold dark:text-teal-400"
          >Quotify</span
        >
      </div>
      <div
        class="col-start-3 flex items-center justify-end gap-2 p-2 md:col-start-4 md:row-start-1"
      >
        <Button
          icon="pi pi-search"
          outlined
          size="small"
          class="bg-surface-300 dark:bg-highlight"
          rounded
          aria-label="Search"
        />
        <Button
          icon="pi pi-bars"
          outlined
          size="small"
          @click="useLayout.changeLayout(LayoutNames.MENU)"
          class="bg-surface-300 dark:bg-highlight"
          aria-label="Search"
        />
      </div>
      <HeaderTabs
        class="col-span-full w-full md:col-span-1 md:row-start-1"
      ></HeaderTabs>
    </div>
  </div>
</template>
