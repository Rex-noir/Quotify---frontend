export default class CursorUtils {
  private element: HTMLDivElement;
  private static markerTextChar = "\ufeff"; // Character used for marker text

  constructor(element: HTMLDivElement) {
    this.element = element;
  }

  // Method to save the cursor position within the element
  saveCursorPosition(): number {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const markerTextNode = document.createTextNode(CursorUtils.markerTextChar);

    if (range) {
      // Insert marker text node at the current cursor position
      range.insertNode(markerTextNode);

      // Return the position of the marker text
      return this.element.textContent?.indexOf(CursorUtils.markerTextChar) ?? 0;
    }
    return 0;
  }

  // Method to restore the cursor position within the element
  restoreCursorPosition(cursorPosition: number): void {
    // Remove marker text node
    this.element.innerHTML = this.element.innerHTML.replace(
      CursorUtils.markerTextChar,
      "",
    );

    // Create a new range and set the cursor position
    const newRange = document.createRange();
    let charCount = 0;

    function setCursor(node: Node): boolean {
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent;
        if (textContent !== null) {
          if (charCount + textContent.length >= cursorPosition) {
            newRange.setStart(node, cursorPosition - charCount);
            newRange.setEnd(node, cursorPosition - charCount);
            return true;
          } else {
            charCount += textContent.length;
          }
        }
      } else {
        for (let child of Array.from(node.childNodes)) {
          if (setCursor(child)) {
            return true;
          }
        }
      }
      return false;
    }

    setCursor(this.element);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  }
}
