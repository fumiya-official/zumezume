import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { toZenkaku } from './utils/toZenkaku'
import { getCaretPosition, moveCaret, getCurrentChild } from './utils/caretOperation'
import { inputRestriction, countContentLines } from './utils/characterLimit'
import { createSpan, createBr } from './utils/createElement'
import PostNavBar from '../NavBar/PostNavBar'
import { WritingModeContext } from './WritingModeContext'

const WorkWrapper = styled.div`
  position: relative;
  text-align: center;
  margin: 35px auto auto auto;
  font-family: Hiragino Mincho ProN;
`;

const HorizontalInputWrapper = styled.div`
  justify-content: center;
  div {
    display: block;
  }

  [contentEditable="true"]:empty:not(:focus):before {
    content: attr(data-placeholder);
    color: #e0e0e0;
  }
`;

const HorizontalContentWrapper = styled.div`
  margin: auto;
  min-width: 500px;
  height: 550px;
  position: relative;
`;

const HorizontalManuscriptPaper = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  content: "";
  margin: auto;
  width: 500px; // background-sizeの左右*20
  height: 600px; // background-zieの上下*20
  text-align: center;
  background-image: linear-gradient(
      to bottom,
      #ffffff,
      #ffffff 10%,
      #96514d 11%,
      #96514d 12%,
      transparent 13%,
      transparent 87%,
      #96514d 88%,
      #96514d 89%,
      #ffffff 90%,
      #ffffff
    ),
    linear-gradient(
      to right,
      transparent,
      transparent 97%,
      #96514d 98%,
      #96514d
    );
  background-size: 25px 30px;
  background-position: top right;
  background-origin: padding-box;
  border: 1px solid #96514d;

  text-orientation: upright;
`;

const HorizontalInputContent = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  width: 520px;
  transform: translateX(-50%);
  text-align: left;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 7px;
  margin: 0;
  margin-left: 0.73em;
  margin-top: 0.05em;
  &:focus {
    outline: none;
  }
`;

const HorizontalTitleWrapper = styled.div`
  margin: 2.2rem auto;
  justify-content: center;
  align-items: center;
`;

const HorizontalInputTitle = styled.div`
  max-width: 100%;
  min-height: 100%;
  font-size: 20px;
  letter-spacing: 3px;
  margin-top: 0.1em;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  &:focus {
    outline: none;
  }

  text-orientation: upright;
`;

const VerticalInputWrapper = styled.div`
  justify-content: center;
  div {
    display: inline-block;
    vertical-align: top;
  }

  line-height: 35px;
  letter-spacing: 7px;

  [contentEditable="true"]:empty:not(:focus):before {
    content: attr(data-placeholder);
    color: #e0e0e0;
  }
`;

const VerticalContentWrapper = styled.div`
  margin: auto;
  min-width: 700px;
  min-height: 550px;
  div {
    display: block;
  }
`;

const VerticalManuscriptPaper = styled.div`
  content: "";
  margin: auto;
  width: 700px;
  height: 504px;
  text-align: left;
  background-image: linear-gradient(
      to right,
      #ffffff,
      #ffffff 10%,
      #96514d 11%,
      #96514d 12%,
      transparent 13%,
      transparent 87%,
      #96514d 88%,
      #96514d 89%,
      #ffffff 90%,
      #ffffff
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent 97%,
      #96514d 98%,
      #96514d
    );
  background-size: 35px 25px;
  background-position: top right;
  background-origin: padding-box;
  border: 2px solid #96514d;

  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;

  text-orientation: upright;
`;

const VerticalInputContent = styled.div`
  font-size: 18px;
  margin: 0;
  margin-right: 0;
  margin-top: 0.2em;
  &:hover {
    cursor: vertical-text;
  }

  &:focus {
    outline: none;
    cursor: vertical-text;
  }
`;

const VerticalTitleWrapper = styled.div`
  margin-left: 15px;
  min-height: 550px;
  div {
    display: block;
  }
  justify-content: center;
  align-items: center;
`;

const VerticalInputTitle = styled.div`
  max-width: 100%;
  min-height: 100%;
  font-size: 20px;
  letter-spacing: 3px;
  margin-top: 0.1em;
  margin-right: auto;
  margin-left: auto;
  text-align: left;
  &:hover {
    cursor: vertical-text;
  }

  &:focus {
    outline: none;
    cursor: vertical-text;
  }

  ::placeholder {
    color: #c0c0c0;
  }

  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;

  text-orientation: upright;
`;


function PostWork() {
  const { writing_mode } = useContext(WritingModeContext)
  const [work, setWork] = useState({
    title: "",
    content: ""
  })
  const [inputting, setInputting] = useState(false)
  const [pushed_key, setPushedKey] = useState("")
  const title_max_words = 20
  const content_max_words = 400
  // trueなら投稿できない
  const [invalid_title, setInvalidTitle] = useState(true)
  const [invalid_content, setInvalidContent] = useState(true)

  // 表示モードが変わったときに値の表示を保持
  useEffect(() => {
    document.getElementById("title").innerHTML = work.title
    document.getElementById("content").innerHTML = work.content
  }, [writing_mode])

  const handleTitleInput = (event) => {
    // 空欄になったとき
    if (event.target.innerText.length === 0) {
      setWork({...work, title: ""})
      setInvalidTitle(true)
      return
    }

    let inputed_title = event.target.innerText
    const element = document.getElementById("title")
    const selection = window.getSelection()
    let caret_position = getCaretPosition(selection, event.target)
    let have_span = false // div内にspanタグがあるかどうか
    
    inputed_title = toZenkaku(inputed_title)

    const str_within_max_word = inputed_title.substr(0, title_max_words)
    const str_outside_max_word = inputed_title.substr(title_max_words, 5)

    event.target.innerText = str_within_max_word
    setWork({...work, title: str_within_max_word})
    
    // 文字数制限を超えたとき
    if( str_outside_max_word !== "" ) {
      let surplus = 0 // 最大文字数+5より多く入力された文字数をカウント

      createSpan(element, str_outside_max_word, 'title-over-max-length')  
      
      // (最大文字数+5)より多く入力されたとき
      if( caret_position - title_max_words > 5 ) {
        surplus = caret_position - title_max_words - 5
      }
      
      // キャレット位置が文字数制限以上の場所に存在したとき
      if( caret_position > title_max_words ) {
        caret_position -= ( title_max_words + surplus )
        have_span = true
      }
    }

    let node = element.childNodes[0]

    // spanタグがある場合はnodeの場所が変わる
    if( have_span ) {
      const span_element = document.getElementById('title-over-max-length')
      node = span_element.childNodes[0]
    }

    moveCaret(node, caret_position, selection)

    // 空欄またはmax word超過ならtrue
    str_within_max_word.length === 0 || str_outside_max_word.length !== 0
      ? setInvalidTitle(true)
      : setInvalidTitle(false)
  }

  const titleKeyDown = (event) => {
    if (!inputting) {
      document.getElementById('content').focus()
      event.preventDefault()
      return
    } else {
      setInputting(false)
    }

    // 許容入力文字数に達したら文字が入力できなくなる (limit=false)
    const limit = inputRestriction(event, event.target.innerText.trim().length, title_max_words + 4)
    if (!limit) {
      event.preventDefault()
      return
    }
  }

  const handleContentInput = (event) => {
    const element = document.getElementById('content')
    const nodes = element.childNodes
    const num_lines = countContentLines(nodes) // 行数の取得
    
    num_lines > 20 || event.target.innerText.length === 0
      ? setInvalidContent(true)
      : setInvalidContent(false)

    if (pushed_key === 'Backspace' || pushed_key == 'Enter') {
      setWork({...work, content: event.target.innerHTML})
      return
    }

    const selection = window.getSelection()
    const event_target = event.target
    let caret_position = getCaretPosition(selection, event_target)
    
    event.target.innerText = toZenkaku(event.target.innerText)
    
    setWork({...work, content: event.target.innerHTML})

    const [current_child_num, child_caret_position] = getCurrentChild(caret_position, nodes)
    
    const node = nodes[current_child_num]
    moveCaret(node, child_caret_position, selection)
  }

  const contentKeyDown = (event) => {
    if (!inputting) {
      const nodes = document.getElementById('content').childNodes
      const num_lines = countContentLines(nodes)
      const num_words = num_lines * 20
      const limit = inputRestriction(event, num_words, content_max_words + 20)

      if (!limit) {
        event.preventDefault()
        return
      }

    }

    if (event.key === 'Enter') {
      // 日本語入力中にEnterが押された(true)、それ意外(false)
      inputting
        ? setInputting(false)
        : handleEnterPushed(event)
    } else {
      setPushedKey(event.key)
    }
  }

  // <br>を生成する
  const handleEnterPushed = (event) => {
    event.preventDefault()
    const selection = window.getSelection()
    let range = selection.getRangeAt(0)

    // <br>を挿入
    createBr(range)

    const element = document.getElementById("content")
    let caret_position = getCaretPosition(selection, element)
    let sum_words = 0
    let sum_nodes = 0
    // 文字数の計算(sum_words), node数の計算
    element.childNodes.forEach((elem) => {
      if (elem.length !== undefined) sum_words += elem.length;
      sum_nodes++
    })

    // 空欄のとき<br>を更に一つ挿入
      // -> sum_nodes === 1
    // 行末でEnterが押されたとき<br>を更に一つ挿入
      // -> sum_words === caret_position
    // ただし行末の行頭で改行するときは挿入しない(<br><br><br>になっているため)
      // -> element.childNodes[sum_nodes-2].nodeType === 1 && element.childNodes[sum_nodes-3].nodeType === 3
    if (sum_nodes === 1) {
      createBr(range)
    }
    else if (
      sum_words === caret_position &&
      element.childNodes[sum_nodes-2].nodeType === 1 &&
      element.childNodes[sum_nodes-3].nodeType === 3
    ) {
      createBr(range)
    }

    selection.removeAllRanges();
    selection.addRange(range);
    event.stopPropagation();
  }
  
  // 一回クリックするだけでは、なぜかfocusされないので
  const handleInputClick = (event) => {
    const clicked_element = event.target.id
    
    if (clicked_element === "title") {
      document.getElementById("title").focus()
      document.getElementById("content").focus()
      document.getElementById("title").focus()
    } else {
      document.getElementById("content").focus()
      document.getElementById("title").focus()
      document.getElementById("content").focus()
    }

    event.preventDefault()
    return
  }
  
  return (
    <>
      <PostNavBar action={"post"} value={work} invalid_title={invalid_title} invalid_content={invalid_content} />
      <WorkWrapper>
        {writing_mode === "HORIZONTAL" ? (
          <HorizontalInputWrapper>
            <HorizontalTitleWrapper>
              <HorizontalInputTitle
                contentEditable="true"
                data-placeholder="タイトル"
                id="title"
                aria-required
                onClick={(event) => {
                  if (work.title === "") handleInputClick(event)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") titleKeyDown(event)
                }}
                onInput={(event) => {
                  if (!inputting) handleTitleInput(event)
                }}
                onCompositionStart={() => {
                  setInputting(true);
                }}
                onCompositionEnd={() => {
                  setInputting(false);
                }}
              />
            </HorizontalTitleWrapper>
            <HorizontalContentWrapper>
              <HorizontalManuscriptPaper />
              <HorizontalInputContent
                  contentEditable="true"
                  data-placeholder="本文"
                  id="content"
                  aria-required
                  onClick={(event) => {
                    if (work.content === "") handleInputClick(event)
                  }}
                  onKeyDown={(event) => {
                    contentKeyDown(event);
                  }}
                  onInput={(event) => {
                    if (!inputting) handleContentInput(event)
                  }}
                  onCompositionStart={() => {
                    setInputting(true);
                  }}
                  onCompositionEnd={() => {
                    setInputting(false);
                  }}
                />
            </HorizontalContentWrapper>
          </HorizontalInputWrapper>
        ) : (
          <VerticalInputWrapper>
            <VerticalContentWrapper>
              <VerticalManuscriptPaper>
                <VerticalInputContent
                  contentEditable="true"
                  data-placeholder="本文"
                  id="content"
                  aria-required
                  onClick={(event) => {
                    if (work.content === "") handleInputClick(event)
                  }}
                  onKeyDown={(event) => {
                    contentKeyDown(event);
                  }}
                  onInput={(event) => {
                    if (!inputting) handleContentInput(event);
                  }}
                  onCompositionStart={() => {
                    setInputting(true);
                  }}
                  onCompositionEnd={() => {
                    setInputting(false);
                  }}
                />
              </VerticalManuscriptPaper>
            </VerticalContentWrapper>
            <VerticalTitleWrapper>
              <VerticalInputTitle
                contentEditable="true"
                data-placeholder="タイトル"
                id="title"
                aria-required
                onClick={(event) => {
                  if (work.title === "") handleInputClick(event)
                }}
                onInput={(event) => {
                  if (!inputting) handleTitleInput(event)
                }}
                onCompositionStart={() => {
                  setInputting(true);
                }}
                onCompositionEnd={() => {
                  setInputting(false);
                }}
              />
            </VerticalTitleWrapper>
          </VerticalInputWrapper>
        )}
      </WorkWrapper>
    </>
  );
}

export default PostWork;