<script setup lang="ts">
import usePrefStore from "@/stores/preferences.store";
import ToggleSwitch from "primevue/toggleswitch";
import { computed } from "vue";

const prefStore = usePrefStore();
const switchModel = computed(() => prefStore.isDark);
</script>
<template>
  <div>
    <div @click="prefStore.toggleDarkMode" class="flex w-full justify-between">
      DarkMode
      <ToggleSwitch v-model="switchModel" />
    </div>
  </div>
</template>
