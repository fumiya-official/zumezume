import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { WorkDataContext, WorkGetContext } from '../../../../context/WorkContext';
import {
  WorkWrapper,
  VerticalWorkWrapper,
  VerticalContentWrapper,
  VerticalManuscriptPaper,
  VerticalContent,
  VerticalTitleWrapper,
  VerticalTitle,
} from "../../../../styles/Work/WorkStyle";

function VerticalShow() {
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
   */
  
  const get = useContext(WorkGetContext);
  const data = useContext(WorkDataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get.getWork(id);
  }, [id]);

  return (
    <WorkWrapper>
      <button onClick={() => navigate(`/works/${data.work.id}/edit`)}>
        編集
      </button>
      <VerticalWorkWrapper>
        <VerticalContentWrapper>
          <VerticalManuscriptPaper>
            <VerticalContent id="content" />
          </VerticalManuscriptPaper>
        </VerticalContentWrapper>
        <VerticalTitleWrapper>
          <VerticalTitle id="title" />
        </VerticalTitleWrapper>
      </VerticalWorkWrapper>
    </WorkWrapper>
  );
}

export default VerticalShow