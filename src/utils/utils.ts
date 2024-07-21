export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

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
  mentionRegex: RegExp,
): string {
  return text.replace(
    mentionRegex,
    '<span class="bg-sky-200 dark:bg-slate-900 px-1 rounded-md ">@$1</span>',
  );
}
