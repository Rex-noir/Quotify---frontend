<script setup lang="ts">
import { ref } from "vue";
import HeaderTabs from "./HeaderTabs.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";

const searchFocus = ref<boolean>(false);
</script>
<template>
  <div class="grid-cols-[250px,1fr,1fr,1fr] items-center gap-10 border-b p-1">
    <div class="prose relative">
      <IconField>
        <InputIcon
          v-show="searchFocus"
          class="pi pi-arrow-left hover:cursor-pointer"
        />
        <InputText
          @focus="searchFocus = true"
          @focusout="searchFocus = false"
          size="small"
          placeholder="Search"
          class="h-fit w-full pl-10"
        />
        <InputIcon class="pi pi-search hover:cursor-pointer" />
      </IconField>
      <div
        v-if="searchFocus"
        class="absolute mt-3 w-full rounded-sm bg-surface-200 p-2"
      >
        Search View
      </div>
    </div>
    <div class="col-span-2 col-start-2">
      <HeaderTabs />
    </div>
    <span class="col-start-4 text-center font-display text-2xl font-bold"
      >Quotify</span
    >
  </div>
</template>
