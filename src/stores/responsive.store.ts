import { defineStore } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";

const useResponsive = defineStore("responsive", () => {
  const isMobile = ref(false);

  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    console.log(handleResize)
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return { isMobile };
});

export default useResponsive;
