import type { Mention } from "@/types/Post/post.types";

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function formatTextWithMentions(
  text: string,
  mentions: Mention[] | undefined,
): string {
  if (!mentions || mentions.length === 0) {
    return text;
  }

  mentions.forEach((mention) => {
    const mentionRegex = new RegExp(`@${mention.username}`, "g");
    text = text.replace(
      mentionRegex,
      `<span class="mention bg-sky-400 text-white px-1 rounded-md" contenteditable="false" data-id="${mention.user_id}">@${mention.username}</span>`,
    );
  });
  return text;
}
