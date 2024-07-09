<script setup lang="ts">
import { computed, ref, watch } from "vue";

const options = ref<{ label: string; icon: string }[]>([
  { label: "Profile", icon: "pi pi-user" },
  { label: "Post", icon: "pi pi-pencil" },
  { label: "Saved", icon: "pi pi-bookmark" },
  { label: "Notifications", icon: "pi pi-bell" },
  { label: "Setting", icon: "pi pi-cog" },
]);

const isDark = ref<boolean>(
  document.documentElement.classList.contains("dark"),
);

const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
  isDark.value = !isDark.value;
};
</script>
<template>
  <div class="flex flex-col border-b p-2">
    <div
      v-ripple
      v-for="(item, index) in options"
      :key="index"
      class="grid w-full cursor-pointer grid-cols-[30px,1fr] items-center gap-2 rounded-lg p-3 hover:bg-surface-200 active:bg-surface-300"
    >
      <span
        :class="item.icon"
        class="w-fit rounded-full border border-surface-300 p-2 text-center"
      ></span>
      <span class="font-display">{{ item.label }}</span>
    </div>
  </div>
  <div class="p-2">
    <div
      v-ripple
      @click="toggleDarkMode"
      class="grid w-full cursor-pointer grid-cols-[30px,1fr] items-center gap-2 rounded-lg p-3 hover:bg-surface-200 active:bg-surface-300"
    >
      <span
        :class="isDark ? 'pi-lightbulb' : 'pi-moon'"
        class="pi w-fit rounded-full border border-surface-300 p-2 text-center"
      ></span>
      <span>{{ isDark ? "Light Mode" : "Dark Mode" }}</span>
    </div>
    <div
      v-ripple
      class="grid w-full cursor-pointer grid-cols-[30px,1fr] items-center gap-2 rounded-lg p-3 hover:bg-surface-200 active:bg-surface-300"
    >
      <span
        class="pi pi-sign-out w-fit rounded-full border border-surface-300 p-2 text-center"
      ></span>
      <span>Logout</span>
    </div>
  </div>
</template>
