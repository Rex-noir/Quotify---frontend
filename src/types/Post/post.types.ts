import type { User } from "../User/user.types";

export interface Post {
  id: number;
  user_id: number;
  title: string;
  quote: string;
  author: string;
  source: string;
  status: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  likes_count: number;
  dislikes_count: number;
  comments_count: number;
}
export enum PostBarActions {
  LIKE = "Like",
  DISLIKE = "Dislike",
  SHARE = "Share",
  COMMENT = "Comment",
}

export enum PostStyles {
  CARD = "rounded-sm",
  CARD_ROUND = "rounded-xl",
}
