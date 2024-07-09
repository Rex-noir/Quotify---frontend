import useUserStore from "@/stores/user.store";
import api from "./api.config";
import { csrf } from "@/utils/auth.utils";

async function boot() {
  await csrf();
}
export default boot;

export async function authCheck() {
  const userStore = useUserStore();
  try {
    const response = await api.post("/auth/verify");
    if (response.status === 206) {
      userStore.logOut();
    } else if (response.status === 200) {
      await retrieveUser();
    }
    return response;
  } catch (error) {
    userStore.logOut();
    throw error;
  }
}

async function retrieveUser() {
  try {
    const response = await api.get("/user");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    useUserStore().logIn(response.data);
    console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
}
