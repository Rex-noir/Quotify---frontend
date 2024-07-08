<script setup lang="ts"></script>
<template>
  <div class="h-full md:grid md:grid-cols-4 md:grid-rows-[150px,1fr]">
    <div
      class="prose flex w-full max-w-none flex-col items-center justify-center p-5 dark:prose-invert md:col-span-full md:col-start-3 md:row-start-1"
    >
      <h1 class="">Quotify</h1>
      <span>" Thou quote, thy quote, thus quote!"</span>
    </div>
    <div class="row-start-2 w-full md:col-span-full md:col-start-3">
      <RouterView />
    </div>
  </div>
</template>
