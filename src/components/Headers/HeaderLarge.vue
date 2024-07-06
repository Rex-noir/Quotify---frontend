<script setup lang="ts">
import HeaderTabs from "./HeaderTabs.vue";
</script>
<template>
  <div class="grid-cols-3 border-b p-1">
    <div class="col-start-1 text-center">
      <span class="font-display text-2xl font-bold">Quotify</span>
    </div>
    <div class="col-span-3 col-start-2">
      <HeaderTabs />
    </div>
  </div>
</template>
