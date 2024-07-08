<script setup lang="ts">
import useHomeViews from "@/stores/homeviews.store";
import { HomeViews, HomeViewsEnum } from "@/types/Views/homeviews.type";
import Button from "primevue/button";

const { currentView } = useHomeViews();
</script>
<template>
  <div class="w-full p-1">
    <div class="col-span-2 grid w-full grid-cols-3 place-items-center gap-2">
      <Button
        outlined
        :class="[
          { 'active-tab': currentView === HomeViews[HomeViewsEnum.POSTS] },
        ]"
        icon="pi pi-home"
        class="tab-buttons"
        size="medium"
        iconPos="top"
      />
      <Button
        outlined
        class="tab-buttons"
        icon="pi pi-users"
        size="medium"
        iconPos="top"
      />
      <Button
        outlined
        icon="pi pi-globe"
        size="medium"
        class="tab-buttons"
        iconPos="top"
      />
    </div>
  </div>
</template>
<style scoped>
.tab-buttons {
  @apply w-full rounded-xl border-none hover:text-slate-600;
}
.active-tab {
  @apply bg-surface-200;
}
</style>
