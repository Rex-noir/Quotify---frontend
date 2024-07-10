<script setup lang="ts">
import useHomeViews from "@/stores/homeviews.store";
import { HomeViews, HomeViewsEnum } from "@/types/Views/homeviews.type";
import Button from "primevue/button";

const { currentView } = useHomeViews();
</script>
<template>
  <div class="grid w-full grid-cols-3 gap-2 p-1">
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
</template>
<style scoped>
.tab-buttons {
  @apply w-full rounded-md border-none;
}
.active-tab {
  @apply prose bg-surface-200 dark:prose-invert dark:bg-highlight;
}
</style>
