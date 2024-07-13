import api from "@/config/api.config";
import type { Post, PostComment } from "@/types/Post/post.types";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";

export default class PostUtils {
  static async fetchPosts(
    url?: string,
  ): Promise<PaginatedResponse<Post> | Post> {
    try {
      const response = await api.get(url || "/posts");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async fetchComments(
    id: number,
    url?: string,
  ): Promise<PaginatedResponse<PostComment>> {
    try {
      const response = await api.get(url || `/posts/${id}/comments`);
      return response.data;
    } catch (error) {
      throw error;  
    }
  }

  static async loadReplies(id: number, url?: string): Promise<PostComment[]> {
    try {
      const response = await api.get(url || `/comments/replies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async singleComment(id: number): Promise<PostComment> {
    try {
      const response = await api.get(`/comments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
