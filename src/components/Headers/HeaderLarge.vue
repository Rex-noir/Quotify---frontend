<script setup lang="ts">
import { ref } from "vue";
import HeaderTabs from "./HeaderTabs.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const searchFocus = ref<boolean>(false);
const showButton = ref<boolean>(false);
</script>
<template>
  <div class="grid-cols-4 items-center gap-10 border-b p-1">
    <div class="relative">
      <div class="col-start-1 flex items-center gap-3 text-center">
        <Transition name="fade" @after-leave="showButton = true">
          <span v-if="!searchFocus" class="font-display text-2xl font-bold"
            >Quotify</span
          >
        </Transition>
        <Button
          v-if="showButton"
          outlined
          class="border-none bg-surface-200"
          size="small"
          icon="pi pi-arrow-left "
        ></Button>
        <InputText
          @focus="searchFocus = true"
          @focusout="
            searchFocus = false;
            showButton = false;
          "
          size="small"
          class="h-fit w-full"
          placeholder="Search"
        />
      </div>
      <div
        v-if="searchFocus"
        class="absolute mt-3 w-full rounded-sm bg-surface-200 p-2"
      >
        Search View
      </div>
    </div>
    <div class="col-span-3 col-start-2">
      <HeaderTabs />
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(-100%);
  transition: all 0.2s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
