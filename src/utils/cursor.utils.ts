export function cursorUtils() {
  function getCaretPosition(element: HTMLElement): number {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  }

  // Helper function to set caret position
  function setCaretPosition(element: HTMLElement, position: number) {
    const range = document.createRange();
    const sel = window.getSelection();

    let currentNode: Node | null = element;
    let currentOffset = 0;

    // Traverse the node tree to find the correct position
    while (currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        const textLength = (currentNode as Text).length;
        if (currentOffset + textLength >= position) {
          range.setStart(currentNode, position - currentOffset);
          range.collapse(true);
          sel?.removeAllRanges();
          sel?.addRange(range);
          return;
        } else {
          currentOffset += textLength;
        }
      }
      currentNode = getNextNode(currentNode, element);
    }
  }

  function setEndOfContenteditable(contentEditableElement: HTMLElement) {
    let range, selection;
    selection = window.getSelection(); //get the selection object (allows you to change selection)

    if (document.createRange && selection) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    }
  }

  function getNextNode(node: Node, root: Node): Node | null {
    if (node.firstChild) {
      return node.firstChild;
    }
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      if (node === root) {
        return null;
      }
      node = node.parentNode!;
    }
    return null;
  }

  return { getCaretPosition, setCaretPosition, setEndOfContenteditable };
}
