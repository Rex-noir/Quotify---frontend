import api from "@/config/api.config";
import type { Post } from "@/types/Post/post.types";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";
import type { AxiosResponse } from "axios";

export default class PostUtils {
  static async fetchPostLists(url?: string): Promise<PaginatedResponse<Post>> {
    try {
      const response = await api.get(url || "/posts");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
