/**
 * @param {Object} selection - window.getSelection()
 * @param {Element} target - event.target
 * @returns {number} 全ノード中におけるキャレット位置
 */
export const getCaretPosition = (selection, target) => {
  /**
   * @param {boolean} is_supported selectionを取得しているかどうか
   * @param {number} caret_position キャレット位置
   */
  const is_supported = typeof selection !== undefined;
  let caret_position = 0;

  if (is_supported) {
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0);
      const pre_caret_range = range.cloneRange();
      pre_caret_range.selectNodeContents(target);
      pre_caret_range.setEnd(range.endContainer, range.endOffset);
      caret_position = pre_caret_range.toString().length;

      return caret_position;
    } else {
      return 0;
    }
  }
}

/**
 * 半角->全角変換の際に失われたキャレットポジションを元の場所に移動
 * @param {Object} node - キャレットをセットするelment中のnode 
 * @param {number} caret_position - 元に戻すキャレット位置
 * @param {Object} selection - window.getSelection
 */
export const moveCaret = (node, caret_position, selection) => {
  const editor_range = document.createRange();
  editor_range.setStart(node, caret_position);
  editor_range.setEnd(node, caret_position);
  editor_range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(editor_range);
}

/**
 * @param {number} caret_position 
 * @param {Object} nodes 
 * @returns {[number, number]} - [現在のelement中のnode番号, そのnode中のキャレット位置]
 */
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