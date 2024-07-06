<script setup lang="ts">
import useHomeViews from "@/stores/homeviews.store";
import { HomeViews, HomeViewsEnum } from "@/types/Views/homeviews.type";
import Button from "primevue/button";

const { currentView } = useHomeViews();
</script>
<template>
  <div class="grid grid-cols-3 p-1">
    <Button class="tab-buttons" type="button" label="Communities" outlined />
    <Button
      class="tab-buttons"
      :class="[
        { 'active-tab': currentView === HomeViews[HomeViewsEnum.POSTS] },
      ]"
      type="button"
      label="Feed"
      outlined
    />
    <Button class="tab-buttons" type="button" label="Groups" outlined />
  </div>
</template>
<style scoped>
.tab-buttons {
  @apply rounded-none border-none;
}
.active-tab {
  @apply bg-surface-300;
}
</style>
