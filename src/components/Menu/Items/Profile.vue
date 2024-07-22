<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import Avatar from "primevue/avatar";
const userStore = useUserStore();
</script>
<template>
  <div v-ripple>
    <div class="flex justify-center" >
      <Avatar
        shape="circle"
        :size="'small'"
        :label="userStore.userInfo?.name[0]"
      />
    </div>
    <div class="prose flex flex-col leading-tight dark:prose-invert">
      <span class="font-bold">{{ userStore.userInfo?.name }}</span>
      <span class="text-sm">View your profile</span>
    </div>
  </div>
</template>
