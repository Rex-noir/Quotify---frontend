import api from "@/config/api.config";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";
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

  static async searchUsers(
    keyword: string,
    limit?: number,
  ): Promise<User[] | Promise<PaginatedResponse<User>>> {
    try {
      const response = await api.get("/users/search", {
        params: {
          keyword: keyword,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
