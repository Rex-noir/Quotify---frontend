<script setup lang="ts">
import Button from "primevue/button";
import HeaderTabs from "./HeaderTabs.vue";
</script>
<template>
  <div class="border-b">
    <div class="grid grid-cols-3 p-2 md:grid-cols-[5fr,1fr,100px]">
      <div
        class="col-span-2 col-start-1 w-full md:col-span-2 md:col-start-2 md:row-start-1 md:flex md:items-center md:justify-center"
      >
        <span class="font-display text-2xl font-bold">Quotify</span>
      </div>
      <div
        class="col-start-3 flex justify-end gap-2 md:col-start-4 md:row-start-1"
      >
        <Button
          icon="pi pi-search"
          outlined
          size="small"
          class="bg-surface-300"
          rounded
          aria-label="Search"
        />
        <Button
          icon="pi pi-bars"
          outlined
          size="small"
          class="bg-surface-300"
          aria-label="Search"
        />
      </div>
      <HeaderTabs
        class="hidden md:col-span-1 md:col-start-1 md:row-start-1 md:grid md:w-full"
      ></HeaderTabs>
    </div>
    <HeaderTabs class="md:hidden"></HeaderTabs>
  </div>
</template>
