import api from "@/config/api.config";
import type { Post } from "@/types/Post/post.types";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";

export default class PostUtils {
  static async fetchPosts(
    url?: string,
  ): Promise<PaginatedResponse<Post[]> | Post> {
    try {
      const response = await api.get(url || "/posts");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
