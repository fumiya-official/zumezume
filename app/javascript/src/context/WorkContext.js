import React, { createContext, useState } from 'react'
import { toZenkaku } from '../views/components/Work/utils/toZenkaku'
import { getCaretPosition, setCaret, getCurrentNode } from '../views/components/Work/utils/caretOperation'
import { inputRestriction, countContentLines } from '../views/components/Work/utils/characterLimit'
import { createSpan, createBr } from '../views/components/Work/utils/createElement'
import { getWork } from '../request/api/work'

const WorkDataContext = createContext()
const WorkInputContext = createContext()
const WorkGetContext = createContext()

const WorkProvider = ({children}) => {
  /**
   * @type {[boolean, Function]} - inputting; true: 日本語入力中, false: それ以外
   * @type {[string, Function]} - pushed_key; 入力したキー名
   * @type {[boolean, Function]} - invalid_title; true: ポスト不可, false: ポスト可能
   * @type {[boolean, Function]} - invalid_content; true: ポスト不可, true: ポスト可能
   * @type {[Object, Function]} - work; 作品データ
   *  @property {string} title - 作品タイトル
   *  @property {string} content - 作品の本文
   * @param {number} title_max_words - タイトルの入力可能な最大文字数
   * @param {number} content_max_words - 本文の入力可能な最大文字数
   */
  const [inputting, setInputting] = useState(false);
  const [pushed_key, setPushedKey] = useState("");
  const [invalid_title, setInvalidTitle] = useState(true);
  const [invalid_content, setInvalidContent] = useState(true);
  const [work, setWork] = useState({
    title: "",
    content: "",
  });
  const title_max_words = 20;
  const content_max_words = 400;

  const handleTitleKeyDown = (event) => {
    // 許容入力文字数に達したら文字が入力できなくなる (limit=false)
    if (!inputting) {
      const can_input = inputRestriction(
        event,
        event.target.innerText.trim().length,
        title_max_words + 4
      );

      if (!can_input) {
        event.preventDefault();
        return;
      }
    }

    if (event.key == "Enter") {
      if (pushed_key == " " || pushed_key == "ArrowUp" || pushed_key == "ArrowDown") {
        setPushedKey(event.key)
        return
      }

      inputting
        ? setInputting(false)
        : (event.preventDefault(), document.getElementById("content").focus())
    } else {
      setPushedKey(event.key)
    }

    return;
  };

  const handleInputTitle = (event) => {
    if (inputting) return;

    // 空欄になったとき
    if (event.target.innerText.length === 0) {
      setWork({ ...work, title: "" });
      setInvalidTitle(true);
      return;
    }

    /**
     * @param {string} inputted_title - タイトルに入力された文字列
     * @param {Object} element - id="title"の要素
     * @param {Object} selection
     * @param {number} caret_position - 全体ノード中のキャレット位置
     * @param {boolean} have_span - true: element内にspanタグがある, false: ない
     */
    let inputted_title = event.target.innerText;
    const element = document.getElementById("title");
    const selection = window.getSelection();
    let caret_position = getCaretPosition(selection, event.target);
    let have_span = false;

    inputted_title = toZenkaku(inputted_title);

    /**
     * @param {string} str_within_max_word - 文字数制限内の文字列
     * @param {string} str_outside_max_word - 文字数制限超過の文字列
     */
    const str_within_max_word = inputted_title.substr(0, title_max_words);
    const str_outside_max_word = inputted_title.substr(title_max_words, 5);

    event.target.innerText = str_within_max_word;
    setWork({ ...work, title: str_within_max_word });

    // 文字数制限を超えたとき
    if (str_outside_max_word !== "") {
      let surplus = 0; // 最大文字数+5より多く入力された文字数をカウント

      createSpan(element, str_outside_max_word, "title-over-max-length");

      // (最大文字数+5)より多く入力されたとき
      if (caret_position - title_max_words > 5) {
        surplus = caret_position - title_max_words - 5;
      }

      // キャレット位置が文字数制限以上の場所に存在したとき
      if (caret_position > title_max_words) {
        caret_position -= title_max_words + surplus;
        have_span = true;
      }
    }

    let node = element.childNodes[0];

    // spanタグがある場合はnodeの場所が変わる
    if (have_span) {
      const span_element = document.getElementById("title-over-max-length");
      node = span_element.childNodes[0];
    }

    setCaret(node, caret_position, selection);

    // 空欄またはmax word超過ならtrue
    str_within_max_word.length === 0 || str_outside_max_word.length !== 0
      ? setInvalidTitle(true)
      : setInvalidTitle(false);
  };

  const handleContentKeyDown = (event) => {
    if (!inputting) {
      const nodes = document.getElementById("content").childNodes;
      const sum_lines = countContentLines(nodes);
      const sum_words = sum_lines * 20;
      const can_input = inputRestriction(event, sum_words, content_max_words + 20);

      // 字数制限外だったら入力無効
      if (!can_input) {
        event.preventDefault();
        return;
      }
    }

    if (event.key == "Enter") {
      // 日本語変換をspace keyで選択した後の変換決定のためEnterが押されたとき
      if (pushed_key == " " || pushed_key == "ArrowUp" || pushed_key == "ArrowDown") {
        setPushedKey(event.key)
        return
      }
      // 日本語入力中にEnterが押された(true)、それ意外(false)
      inputting ? setInputting(false) : handleEnterPushed(event);
      setPushedKey("")
    } else {
      setPushedKey(event.key);
    }
  };

  const handleInputContent = (event) => {
    if (inputting) return
    
    const element = document.getElementById("content");
    const nodes = element.childNodes;
    let sum_lines = countContentLines(nodes); // 行数の取得

    if (pushed_key == "Backspace" || pushed_key == "Enter") {
      sum_lines > 20 || event.target.innerText.length === 0
        ? setInvalidContent(true)
        : setInvalidContent(false);

      setWork({ ...work, content: event.target.innerHTML });
      return;
    }

    const selection = window.getSelection();
    let caret_position = getCaretPosition(selection, event.target);

    event.target.innerText = toZenkaku(event.target.innerText);

    setWork({ ...work, content: event.target.innerHTML });

    const [current_child_num, child_caret_position] = getCurrentNode(
      caret_position,
      nodes
    );

    const node = nodes[current_child_num];
    setCaret(node, child_caret_position, selection);

    sum_lines = countContentLines(nodes);

    sum_lines > 20 || event.target.innerText.length === 0
      ? setInvalidContent(true)
      : setInvalidContent(false);
  };

  const handleEnterPushed = (event) => {
    event.preventDefault();
    const selection = window.getSelection();
    let range = selection.getRangeAt(0);

    // <br>を挿入
    createBr(range);

    const element = document.getElementById("content");
    let caret_position = getCaretPosition(selection, element);
    let sum_words = 0;
    let sum_nodes = 0;
    // 文字数の計算(sum_words), node数の計算
    element.childNodes.forEach((elem) => {
      if (elem.length !== undefined) sum_words += elem.length;
      sum_nodes++;
    });
    console.log("nodeの数: "+sum_nodes)
    console.log("文字数: "+sum_words)
    console.log("キャレット位置: "+caret_position)
    // 文字数が0字の場合、<br>を挿入
    // -> sum_nodes === 1
    // 行末でEnterが押されたとき<br>を挿入
    // -> sum_words === caret_position
    // ただし行末の行頭で改行するときは挿入しない(<br><br><br>になっているため)
    // -> element.childNodes[sum_nodes-2].nodeType === 1 && element.childNodes[sum_nodes-3].nodeType === 3
    if (sum_nodes === 1) {
      createBr(range);
    } else if (
      sum_words === caret_position &&
      element.childNodes[sum_nodes - 2].nodeType === 1 &&
      element.childNodes[sum_nodes - 3].nodeType === 3
    ) {
      createBr(range);
    }

    selection.removeAllRanges();
    selection.addRange(range);
    event.stopPropagation();

    const nodes = element.childNodes;
    const sum_lines = countContentLines(nodes); // 行数の取得
    sum_lines > 20 || event.target.innerText.length === 0
      ? setInvalidContent(true)
      : setInvalidContent(false);
    
    return
  };

  const handleSettingWork = (_title, _content) => {
    document.getElementById("title").innerHTML = _title;
    document.getElementById("content").innerHTML = _content;
  };

  const handleGetWork = async (id) => {
    try {
      const resp = await getWork(id)
      setWork({
        id: resp.data.id,
        title: resp.data.title,
        content: resp.data.content,
        user_id: resp.data.user_id,
        author: resp.data.author,
        author_id: resp.data.author_id,
      });

      handleSettingWork(resp.data.title, resp.data.content)
    }
    catch(err) {
      console.log(err)
    }
  };

  const data = {
    work,
    setWork,
  }

  const input = {
    invalid_title,
    invalid_content,
    setInputting,
    handleTitleKeyDown,
    handleInputTitle,
    handleContentKeyDown,
    handleInputContent,
  };

  const get = {
    handleGetWork,
    handleSettingWork
  }

  return (
    <WorkDataContext.Provider value={data}>
      <WorkInputContext.Provider value={input}>
        <WorkGetContext.Provider value={get}>
          {children}
        </WorkGetContext.Provider>
      </WorkInputContext.Provider>
    </WorkDataContext.Provider>
  );
}

export { WorkDataContext, WorkInputContext, WorkGetContext, WorkProvider }