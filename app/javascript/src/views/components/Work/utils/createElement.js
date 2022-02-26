/**
 * @param {Object} parent_element - 作成するspanタグの親要素
 * @param {string} string_over_limit - 文字数超過の文字列
 * @param {string} id - spanタグのid名 
 */
export const createSpan = (parent_element, string_over_limit, id) => {
  const new_span = document.createElement('span')
  new_span.id = id
  new_span.style.background = "#E37974"
  new_span.innerText = string_over_limit
  parent_element.insertAdjacentElement('beforeend', new_span)
}

/**
 * @param {Object} range - selection.getRangeAt(0)
 */
export const createBr = (range) => {
  const new_br_element = document.createElement("br")
  range.deleteContents();
  range.insertNode(new_br_element)
  range.setStartAfter(new_br_element)
  range.setEndAfter(new_br_element)
}