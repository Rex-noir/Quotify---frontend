import { defineStore } from "pinia";
import { ref } from "vue";

const useResponsive = defineStore("responsive", () => {
  const layout = ref<"mobile" | "tablet" | "desktop">("mobile");

  const handleResize = () => {
    const width = window.innerWidth;

    if (width <= 425) {
      layout.value = "mobile"; // Layout for max 425px
    } else if (width < 1024) {
      layout.value = "tablet"; // Layout for max 1023px
    } else {
      layout.value = "desktop"; // Layout for anything larger
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return { layout };
});

export default useResponsive;
