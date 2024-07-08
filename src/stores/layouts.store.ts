import { LayoutNames, layouts } from "@/types/Layouts/layouts.types";
import { defineStore } from "pinia";
import { shallowRef, type DefineComponent } from "vue";

const useLayoutStore = defineStore("layouts", () => {
  const currentLayout = shallowRef<DefineComponent | null>(null);

  function changeLayout(layout: LayoutNames) {
    currentLayout.value = layouts[layout];
  }

  return { currentLayout, changeLayout };
});

export default useLayoutStore;
