<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import type { User } from "@/types/User/user.types";
import Avatar from "primevue/avatar";
const userStore = useUserStore();

const props = defineProps<{
  user?: User;
}>();

const userInfo = props.user ? props.user : userStore.userInfo;
</script>
<template>
  <div v-ripple>
    <div class="flex justify-center">
      <Avatar shape="circle" :size="'small'" :label="userInfo?.name[0]" />
    </div>
    <div class="prose flex flex-col leading-[1.1] dark:prose-invert">
      <span class="m-0 p-0 font-bold">{{ userInfo?.name }}</span>
      <span class="m-0 p-0 text-sm">@{{ userInfo?.username }}</span>
    </div>
  </div>
</template>
