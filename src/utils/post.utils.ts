import api from "@/config/api.config";
import type { Post, PostComment, Reactions } from "@/types/Post/post.types";
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
    id?: number,
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

  static async postComment(data: {
    content: string;
    postId: number;
    parentId?: number;
  }) {
    try {
      const response = await api.post("/comments", {
        content: data.content,
        post_id: data.postId,
        parent_id: data.parentId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async react(postId: number, reaction: Reactions) {
    try {
      const response = await api.post(`/posts/${postId}/${reaction}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async reactComment(commentId: number, reaction: Reactions) {
    try {
      const response = await api.post(`/comments/${commentId}/${reaction}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
