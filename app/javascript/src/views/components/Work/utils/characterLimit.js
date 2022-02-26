/**
 * @param {Object} event - event
 * @param {number} string_length - 文字数
 * @param {number} max_length - 最大文字数
 * @returns {boolean} - true: 入力可能 false: 入力不可
 */
export const inputRestriction = (event, string_length, max_length) => {
  const keys = [
    "Backspace",
    "Meta",
    "Shift",
    "Control",
    "Alt",
    "Delete",
    "ArrowLeft",
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
  ];

  const utils = {
    special: {},
    navigational: {},
    isSpecial(e) {
      return typeof this.special[e.key] !== "undefined";
    },
  };

  keys.forEach((key) => {
    utils.special[key] = true;
  });

  let has_selection = false;
  const selection = window.getSelection();
  const is_special = utils.isSpecial(event);

  if (selection) {
    has_selection = !!selection.toString();
  }

  // ショートカットキー
  if (event.metaKey || event.ctrlKey) return true

  // deleteとかEnterとか
  if (is_special) return true

  if (string_length > max_length && !has_selection) return false

  return true;
}

/**
 * @param {Object} nodes - id="content"に属するnode全て
 * @returns {number} - contentの行数
 */
export const countContentLines = (nodes) => {
  let sum_line = 0
  let sum_br = 0
  let prev_node_type = 1 // set 1 for first children is br
  
  nodes.forEach((node) => {
    if( node.length === undefined ) { // nodeが<br>のとき     
      prev_node_type === 1 // 1つ前のnodeが<br>ならtrue
        ? sum_br += 1
        : sum_br += 0

      prev_node_type = 1
    } else { // nodeの中身が文字列のとき
      if( prev_node_type === 3 ) return // if bug
      
      prev_node_type = 3

      const line = Math.ceil( node.length / 20 )
      sum_line += line
    }
  })

  return sum_line + sum_br
}

/**
 * @param {*} text - 文章
 * @param {number} max_word - 最大文字数/行
 * @param {boolean} type - true: text, false: html
 * @returns {number} - textの行数
 */
export const getNumLines = (text, max_word, type) => {
  let num_lines = 0;
  let text_split_new_line = type ? text.split(/\n/) : text.split(/<br>/)
  
  text_split_new_line.forEach((elem) => {
    num_lines = num_lines + Math.ceil(elem.length / max_word);
  });

  return num_lines;
};