<script setup lang="ts">
import { ref } from "vue";
const items = ref(Array.from({ length: 30 }).map((_, i) => `Community #${i}`));
</script>

<template>
  <div
    class="prose h-full w-full p-2 dark:prose-invert prose-h2:mb-0 dark:bg-surface-0"
  >
    <div class="sticky md:top-20 lg:top-[4.2rem]">How to dissapear</div>
  </div>
</template>
