<script setup lang="ts">
import usePrefStore from "@/stores/preferences.store";
import { computed, ref, watch } from "vue";

const options = ref<{ label: string; icon: string }[]>([
  { label: "Profile", icon: "pi pi-user" },
  { label: "Post", icon: "pi pi-pencil" },
  { label: "Saved", icon: "pi pi-bookmark" },
  { label: "Notifications", icon: "pi pi-bell" },
  { label: "Setting", icon: "pi pi-cog" },
]);

const prefStore = usePrefStore();
</script>
<template>
  <div class="h-full bg-surface-100 dark:bg-surface-0">
    <div class="sticky top-16 flex flex-col p-2">
      <div
        v-ripple
        v-for="(item, index) in options"
        :key="index"
        class="btn-div"
      >
        <span :class="item.icon" class="icon-div"></span>
        <span class="font-display">{{ item.label }}</span>
      </div>
      <div v-ripple @click="prefStore.toggleDarkMode" class="btn-div">
        <span
          :class="prefStore.isDark ? 'pi-lightbulb' : 'pi-moon'"
          class="icon-div pi pi-moon"
        ></span>
        <span>{{ prefStore.isDark ? "Light Mode" : "Dark Mode" }}</span>
      </div>
      <div v-ripple class="btn-div">
        <span class="icon-div pi pi-sign-out"></span>
        <span>Logout</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-div {
  @apply grid w-full cursor-pointer grid-cols-[30px,1fr] items-center gap-2 rounded-lg p-3 hover:bg-surface-100 dark:hover:bg-highlight-emphasis;
}
.icon-div {
  @apply w-fit rounded-full border border-primary-emphasis p-2 text-center;
}
</style>
