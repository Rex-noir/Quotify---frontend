<script setup lang="ts">
import DarkMode from "@/components/Menu/Items/DarkMode.vue";
import MenuProfile from "@/components/Menu/Items/Profile.vue";
import Saved from "@/components/Menu/Items/Saved.vue";
</script>
<template>
  <div class="fixed top-14 grid h-fit w-full grid-cols-2 gap-3 p-3">
    <MenuProfile class="items-container col-span-2 w-full gap-3" />
    <Saved class="items-container" />
    <DarkMode class="items-container col-span-2" />
  </div>
</template>
<style scoped>
.items-container {
  @apply flex h-fit cursor-pointer items-center gap-3 rounded-md bg-[#faf8f8] px-2 py-2 shadow-sm hover:bg-emphasis dark:bg-[#4f4e4f];
}
</style>
