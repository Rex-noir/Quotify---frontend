import { defineStore } from "pinia";
import { ref } from "vue";

const usePrefStore = defineStore("preferences", () => {
  const isDark = ref(document.documentElement.classList.contains("dark"));

  function toggleDarkMode() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark");
    saveUserPref();
  }

  function loadUserPref() {
    const prefData = localStorage.getItem("userPref");
    if (prefData) {
      try {
        const prefObj = JSON.parse(prefData);
        isDark.value = prefObj.isDark;
        document.documentElement.classList.toggle("dark", isDark.value);
      } catch (error) {
        console.error("Error parsing user preferences:", error);
      }
    }
  }
  function saveUserPref() {
    const userPref = {
      isDark: isDark.value,
    };
    localStorage.setItem("userPref", JSON.stringify(userPref));
  }

  return { toggleDarkMode, isDark, loadUserPref };
});
export default usePrefStore;
