import { LayoutNames, layouts } from "@/types/Layouts/layouts.types";
import { defineStore } from "pinia";
import { nextTick, ref, shallowRef, type DefineComponent } from "vue";

const useLayoutStore = defineStore("layouts", () => {
  const currentLayout = shallowRef<DefineComponent | null>(null);
  const scrollPosition = ref<number | null>(null);
  const showProgressBar = ref<boolean>(false);
  const layoutLoaded = ref<boolean>(false);

  async function changeLayout(layout: LayoutNames) {
    showProgressBar.value = true; // Show progress bar immediately
    await new Promise<void>((resolve) => setTimeout(resolve, 200)); // 100ms delay

    layoutLoaded.value = false; // Reset layout loaded state

    // Update layout
    currentLayout.value = layouts[layout];

    // Wait for layout to render
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (layoutLoaded.value) {
          clearInterval(interval);
          resolve();
        }
      }, 50); // Check every 50ms
    });

    showProgressBar.value = false; // Hide progress bar
  }

  function notifyLayoutLoaded() {
    layoutLoaded.value = true;
  }

  function setScrollPosition(position: number) {
    scrollPosition.value = position;
  }

  function toggleProgressBar(value?: boolean) {
    if (value === undefined) {
      showProgressBar.value = !showProgressBar.value;
    } else {
      showProgressBar.value = value;
    }
  }

  return {
    currentLayout,
    showProgressBar,
    changeLayout,
    scrollPosition,
    setScrollPosition,
    toggleProgressBar,
    notifyLayoutLoaded,
  };
});

export default useLayoutStore;
