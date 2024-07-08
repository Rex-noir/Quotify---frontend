import type { User } from "@/types/User/user.types";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  const status = ref<boolean>();
  const userInfo = ref<User | null>(null);
  const loading = ref<boolean>(true);

  function logOut() {
    status.value = false;
    loading.value = false;
  }

  function logIn(info: User) {
    userInfo.value = info;
    status.value = true;
    loading.value = false;
  }

  return { status, userInfo, logOut, logIn, loading };
});

export default useUserStore;
