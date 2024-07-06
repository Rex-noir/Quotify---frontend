<script setup lang="ts">
import HeaderSmall from "@/components/Headers/HeaderSmall.vue";
import HeaderLarge from "@/components/Headers/HeaderLarge.vue";
import useHomeViews from "@/stores/homeviews.store";
import SearchView from "@/views/Home/SearchView.vue";

const currentView = useHomeViews().currentView;
</script>
<template>
  <div>
    <HeaderSmall class="md:hidden" />
    <HeaderLarge class="hidden md:grid" />
    <div class="md:grid md:grid-cols-3">
      <component class="hidden md:block" :is="SearchView" />
      <component class="col-span-2 md:col-start-2" :is="currentView" />
    </div>
  </div>
</template>
