<script setup lang="ts">
import { ref } from "vue";
import HeaderTabs from "./HeaderTabs.vue";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";

const searchFocus = ref<boolean>(false);
</script>
<template>
  <div class="grid-cols-[250px,1fr,1fr,1fr] items-center gap-2 border-none p-1">
    <div class="prose relative dark:prose-invert">
      <IconField>
        <InputIcon
          v-show="searchFocus"
          @click="searchFocus = false"
          class="pi pi-arrow-left hover:cursor-pointer"
        />
        <InputText
          @focus="searchFocus = true"
          size="small"
          placeholder="Search"
          class="prose h-fit w-full bg-surface-0 pl-10 dark:prose-invert"
        />
        <InputIcon class="pi pi-search hover:cursor-pointer" />
      </IconField>
      <div
        v-if="searchFocus"
        class="prose absolute mt-1 h-screen w-full rounded-sm bg-surface-200 p-2 dark:prose-invert dark:bg-[#272626]"
      >
        Search View
      </div>
    </div>
    <div class="col-span-2 col-start-2">
      <HeaderTabs />
    </div>
    <span
      class="col-start-4 text-center font-display text-2xl font-bold dark:text-teal-300"
      >Quotify</span
    >
  </div>
</template>
