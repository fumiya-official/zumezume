import React, { useContext, useEffect } from 'react'
import { WorkDataContext, WorkGetContext } from '../../../../context/WorkContext';
import { getNumLines } from "../utils/characterLimit";
import {
  WorkWrapper,
  HorizontalWorkWrapper,
  HorizontalContentWrapper,
  HorizontalManuscriptPaper,
  HorizontalContent,
  HorizontalTitleWrapper,
  HorizontalTitle,
} from "../../../../styles/Work/WorkStyle";
import { WritingModeContext } from '../../../../context/WritingModeContext';

function HorizontalShow() {
  /**
   * @param {Object} data - 作品情報に関連
   *  @type {UseState}
   *    @property {State} work - 作品情報
   *      @property {string} title - 作品のタイトル
   *      @property {string} content - 作品の文章
   *    @property {StateSetter} setWork - workの更新
   *
   * @param {Object} get - 作品情報を取得
   *  @property {Function} getWork - work_idと一致する作品情報を取得
   *
   * @param {{id: number}} id - リクエストするwork_id
   *
   * @param {Function} navigate - ページ遷移
   *
   * @param {Number} num_lines - 作品の文章の行数
   */
  const data = useContext(WorkDataContext);
  const get = useContext(WorkGetContext);
  const { writing_mode } = useContext(WritingModeContext);
  let num_lines = getNumLines(data.work.content, 20, 0);

  // 書く方向が変わった時に作品を表示できるように
  useEffect(() => {
    if (data.work) get.handleSettingWork(data.work.title, data.work.content);
  }, [writing_mode]);

  return (
    <WorkWrapper>
      <HorizontalWorkWrapper>
        <HorizontalTitleWrapper>
          <HorizontalTitle id="title" />
        </HorizontalTitleWrapper>
        <HorizontalContentWrapper lines={num_lines}>
          <HorizontalManuscriptPaper lines={num_lines} />
          <HorizontalContent id="content" />
        </HorizontalContentWrapper>
      </HorizontalWorkWrapper>
    </WorkWrapper>
  );
}

export default HorizontalShow