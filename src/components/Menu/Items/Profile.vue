<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import Avatar from "primevue/avatar";
const userStore = useUserStore();
</script>
<template>
  <div v-ripple>
    <div class="flex justify-center">
      <Avatar
        shape="circle"
        :size="'small'"
        :label="userStore.userInfo?.name[0]"
      />
    </div>
    <div class="prose flex flex-col leading-[1.1] dark:prose-invert">
      <span class="m-0 p-0 font-bold">{{ userStore.userInfo?.name }}</span>
      <span class="m-0 p-0 text-sm">@{{ userStore.userInfo?.username }}</span>
    </div>
  </div>
</template>
