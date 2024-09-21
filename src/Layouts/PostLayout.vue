<script setup lang="ts">
import PostView from "@/views/Quote/QuoteView.vue";
import Button from "primevue/button";
</script>
<template>
  <div class="mx-auto h-full w-full md:w-[500px] lg:w-[700px]">
    <div
      class="prose grid max-w-none grid-cols-[auto,1fr] items-center p-2 dark:prose-invert"
    >
      <Button
        icon="pi pi-arrow-left"
        @click="$router.go(-1)"
        class="prose border-none bg-inherit dark:prose-invert"
      />
      <div class="prose w-full dark:prose-invert"><h3>Quote</h3></div>
    </div>
    <component :is="PostView" />
  </div>
</template>
