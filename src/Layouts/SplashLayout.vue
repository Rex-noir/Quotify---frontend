<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import SplashView from "@/views/Splash/SplashView.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
watch(userStore, (newUserStore) => {
  if (newUserStore.loading === false) {
    router.push({ name: "home" });
  }
});
</script>
<template>
  <SplashView></SplashView>
</template>
