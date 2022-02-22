export const createSpan = (parent_node, string_over_limit, id) => {
  const new_span = document.createElement('span')
  new_span.id = id
  new_span.style.background = "#E37974"
  new_span.innerText = string_over_limit
  parent_node.insertAdjacentElement('beforeend', new_span)
}

export const createBr = (range) => {
  const new_br_element = document.createElement("br")
  range.deleteContents();
  range.insertNode(new_br_element)
  range.setStartAfter(new_br_element)
  range.setEndAfter(new_br_element)
}