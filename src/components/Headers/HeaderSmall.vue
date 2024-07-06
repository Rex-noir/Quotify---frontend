<script setup lang="ts">
import Button from "primevue/button";
import HeaderTabs from "./HeaderTabs.vue";
</script>
<template>
  <div class="border-b">
    <div class="grid grid-cols-3 p-2">
      <div class="col-span-2 col-start-1">
        <span class="font-display text-2xl font-bold">Quotify</span>
      </div>
      <div class="col-start-3 flex justify-end gap-2">
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
    </div>
    <HeaderTabs></HeaderTabs>
  </div>
</template>
