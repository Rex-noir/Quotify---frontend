<script setup lang="ts">
import VirtualScroller from "primevue/virtualscroller";
import { ref } from "vue";
const items = ref(Array.from({ length: 30 }).map((_, i) => `Community #${i}`));
</script>

<template>
  <div class="prose h-full w-full p-3 prose-h2:mb-0">
    <h2>All Communities</h2>
    <VirtualScroller :items="items" :itemSize="50" class="h-full w-full">
      <template v-slot:item="{ item, options }">
        <div
          :class="[
            'flex items-center p-2',
            { 'bg-surface-100 dark:bg-surface-700': options.odd },
          ]"
          style="height: 50px"
        >
          {{ item }}
        </div>
      </template>
    </VirtualScroller>
  </div>
</template>
