import api from "@/config/api.config";
import type { User } from "@/types/User/user.types";

export default class UserUtils {
  static async getUser(id: number): Promise<User> {
    try {
      const response = await api.get(`users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
