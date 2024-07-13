<script setup lang="ts">
import SignUpView from "@/views/Auth/SignUpView.vue";
</script>
<template>
  <div class="h-screen md:grid md:grid-cols-[2fr,1fr]">
    <div
      class="prose flex w-full max-w-none flex-col items-center justify-center p-5 dark:prose-invert md:col-start-1"
    >
      <h1 class="text-7xl dark:text-teal-500">Quotify</h1>
      <span>" Thou quote, thy quote, thus quote!"</span>
    </div>
    <div class="w-full md:col-start-2">
      <router-view v-slot="{ Component }">
        <component v-if="$route.name === 'signup'" :is="Component" />
      </router-view>
    </div>
  </div>
</template>
