import type { User } from "../User/user.types";

export interface Post {
  id: number;
  user_id: number;
  title: string;
  quote: string;
  author: string;
  source: string;
  status: string;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
  user: User;
  likes_count: number;
  dislikes_count: number;
  comments_count: number;
  is_liked_by_user: boolean;
  is_disliked_by_user?: boolean;
}

export enum PostBarActions {
  LIKE = "Like",
  DISLIKE = "Dislike",
  SHARE = "Share",
  COMMENT = "Comment",
}

export enum CommentBarActions {
  LIKE = "Like",
  DISLIKE = "Dislike",
  SHARE = "Share",
  COMMENT = "Comment",
}

export enum PostStyles {
  CARD = "rounded-sm",
  CARD_ROUND = "rounded-xl",
}

export interface PostComment {
  id: number;
  post_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  gif_url: string | null;
  created_at: Date;
  updated_at: Date;
  likes_count: number;
  dislikes_count: number;
  user: User;
  replies_count: number;
  level: number;
  replies: PostComment[] | null;
}

export enum Reactions {
  LIKE = "like",
  DISLIKE = "dislike",
}
