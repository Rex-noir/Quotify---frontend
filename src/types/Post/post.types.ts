export interface Post {
  username?: string;
  title?: string;
  quote?: string;
  author?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  share?: number;
  timestamp?: string;
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
