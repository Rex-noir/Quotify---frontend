<script setup lang="ts">
import { ref } from "vue";
const items = ref(Array.from({ length: 30 }).map((_, i) => `Community #${i}`));
</script>

<template>
  <div
    class="prose h-full p-2 w-full dark:prose-invert prose-h2:mb-0 dark:bg-surface-0"
  >
    hi
  </div>
</template>
