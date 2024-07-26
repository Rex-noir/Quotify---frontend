<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import Avatar from "primevue/avatar";

const userStore = useUserStore();
</script>
<template>
  <div
    class="cursor-pointer rounded-lg border p-2 shadow-sm dark:border-[#383838] dark:bg-[#2e2d2d]"
  >
    <div class="grid grid-cols-[30px,1fr] items-center gap-3">
      <div>
        <Avatar shape="circle" :label="userStore.userInfo?.name[0]" />
      </div>
      <div
        v-ripple
        class="prose w-full max-w-none rounded-2xl bg-[#dad9d9] p-2 transition-all dark:prose-invert hover:bg-[#e9e7e7] dark:bg-[#262626] dark:hover:bg-[#3d3d3d]"
      >
        Quote a quote ?
      </div>
    </div>
  </div>
</template>
