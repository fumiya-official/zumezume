import React, { useContext, useEffect, useRef, useState } from 'react'
import { WorkDataContext, WorkGetContext, WorkInputContext } from '../../../../context/WorkContext'
import { WritingModeContext } from '../../../../context/WritingModeContext';
import {
  WorkWrapper,
  HorizontalWorkWrapper,
  HorizontalContentWrapper,
  HorizontalManuscriptPaper,
  HorizontalContent,
  HorizontalTitleWrapper,
  HorizontalTitle
} from '../../../../styles/Work/WorkStyle';

function HorizontalPost(props) {
  /**
   * @param {Object} data - 作品情報に関連
   *  @type {UseState}
   *    @property {State} work - 作品情報
   *      @property {string} title - 作品のタイトル
   *      @property {string} content - 作品の文章
   *    @property {StateSetter} setWork - workの更新
   *
   * @param {Object} input - 作品入力に関連
   *  @property {Function} handleTitleKeyDown - タイトル入力時に制限文字数超過を制御
   *  @property {Fuction} handleInputTitle - タイトル入力時に全角変換等を行う
   *  @property {Function} handleContentKeyDown - コンテンツ入力時に制限文字数超過を制御
   *  @property {Function} handleInputContent - コンテンツ入力時に全角変換等を行う
   *  @type {UseState}
   *    @property {StateSetter} setInputting - 日本語入力中またはそれ以外かをセット
   *
   * @param {{writing_mode: boolean}} writing_mode - 書き方の方向 [1: 横書き, 0: 縦書き]
   *
   * @param {Object} get - 作品情報を取得
   *  @property {Function} handleSettingWork - 作品タイトルとその文章をそれぞれのdiv要素にセットする
   */

  const data = useContext(WorkDataContext);
  const input = useContext(WorkInputContext);
  const get = useContext(WorkGetContext);
  const { writing_mode } = useContext(WritingModeContext);

  // 書く方向が変わった時に作品を表示できるように
  useEffect(() => {
    if (props.first_render.current) {// 初回レンダー時は例外
      props.first_render.current = false
    } else {
      if (data.work) get.handleSettingWork(data.work.title, data.work.content);
    }
  }, [writing_mode]);

  return (
    <>
      <WorkWrapper>
        <HorizontalWorkWrapper>
          <HorizontalTitleWrapper>
            <HorizontalTitle
              contentEditable="true"
              data-placeholder="タイトル"
              id="title"
              aria-required
              onKeyDown={input.handleTitleKeyDown}
              onInput={input.handleInputTitle}
              onCompositionStart={() => input.setInputting(true)}
              onCompositionEnd={() => input.setInputting(false)}
            />
          </HorizontalTitleWrapper>
          <HorizontalContentWrapper>
            <HorizontalManuscriptPaper />
            <HorizontalContent
              contentEditable="true"
              data-placeholder="本文"
              id="content"
              aria-required
              onKeyDown={input.handleContentKeyDown}
              onInput={input.handleInputContent}
              onCompositionStart={() => input.setInputting(true)}
              onCompositionEnd={() => input.setInputting(false)}
            />
          </HorizontalContentWrapper>
        </HorizontalWorkWrapper>
      </WorkWrapper>
    </>
  );
}

export default HorizontalPost