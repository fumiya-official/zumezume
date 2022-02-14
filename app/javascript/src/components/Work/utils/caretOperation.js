// 全ノード中におけるキャレット位置を取得
export const getCaretPosition = (selection, event_target) => {
  const is_supported = typeof window.getSelection !== undefined;
  let caret_position = 0;

  if (is_supported) {
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0);
      const pre_caret_range = range.cloneRange();
      pre_caret_range.selectNodeContents(event_target);
      pre_caret_range.setEnd(range.endContainer, range.endOffset);
      caret_position = pre_caret_range.toString().length;

      return caret_position;
    } else {
      return 0;
    }
  }
}

// 半角->全角変換の際に失われたキャレットポジションを元の場所に移動
export const moveCaret = (node, caret_position, selection) => {
  const editor_range = document.createRange();
  editor_range.setStart(node, caret_position);
  editor_range.setEnd(node, caret_position);
  editor_range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(editor_range);
}

// 現在位置するノード番号(current_child_num)
// そのノード中のキャレット位置(caret_position)
// をreturnする
export const getCurrentChild = (caret_position, nodes) => {
  let sum_of_length = 0
  let current_child_num = 0
  for(let i = 0; sum_of_length < caret_position; i++) {
    if (nodes[i].length === undefined) {
      continue
    }

    if (sum_of_length + nodes[i].length >= caret_position) {
      current_child_num = i
      caret_position -= sum_of_length
      break
    }

    sum_of_length += nodes[i].length
  }

  return [current_child_num, caret_position]

}