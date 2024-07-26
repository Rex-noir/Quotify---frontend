import api from "@/config/api.config";

export default class AuthUtils {
  static async login(credentials: {
    email?: string;
    username?: string;
    password: string;
  }) {
    await csrf();
    try {
      const response = await api.post("auth/login", { ...credentials });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export async function csrf() {
  try {
    await api.get("/csrf-cookie");
  } catch (error) {
    throw error;
  }
}
