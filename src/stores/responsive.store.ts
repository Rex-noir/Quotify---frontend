import { defineStore } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

const useResponsive = defineStore("responsive", () => {
  const layout = ref<"mobile" | "tablet" | "desktop">("mobile");

  const handleResize = () => {
    const width = window.innerWidth;

    if (width <= 425) {
      layout.value = "mobile"; // Layout for max 425px
    } else if (width <= 768) {
      layout.value = "tablet"; // Layout for max 768px
    } else {
      layout.value = "desktop"; // Layout for anything larger
    }
  };

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { layout };
});

export default useResponsive;
