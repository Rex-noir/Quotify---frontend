<script setup lang="ts">
import { ref } from "vue";
import HeaderTabs from "./HeaderTabs.vue";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";

const searchFocus = ref<boolean>(false);
</script>
<template>
  <div class="grid-cols-[1fr,1.5fr,1fr] items-center border-none py-3">
    <span class="text-center font-display text-2xl font-bold dark:text-teal-300"
      >Quotify</span
    >
    <div class="col-start-2">
      <HeaderTabs />
    </div>
    <div class="prose relative col-start-3 dark:prose-invert">
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
        class="prose absolute mt-3 h-screen w-full rounded-sm bg-surface-200 p-2 dark:prose-invert dark:bg-[#272626]"
      >
        Search View
      </div>
    </div>
  </div>
</template>
