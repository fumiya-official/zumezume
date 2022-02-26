import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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

  const get = useContext(WorkGetContext);
  const data = useContext(WorkDataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  let num_lines = getNumLines(data.work.content, 20, 0);

  useEffect(() => {
    get.getWork(id);
  }, [id]);

  return (
    <WorkWrapper>
      <HorizontalWorkWrapper>
        <button onClick={() => navigate(`/works/${data.work.id}/edit`)}>
          編集
        </button>
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