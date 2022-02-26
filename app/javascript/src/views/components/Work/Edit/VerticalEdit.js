import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { WorkDataContext, WorkGetContext, WorkInputContext } from '../../../../context/WorkContext';
import { WritingModeContext } from '../../../../context/WritingModeContext';
import {
  WorkWrapper,
  VerticalWorkWrapper,
  VerticalContentWrapper,
  VerticalManuscriptPaper,
  VerticalContent,
  VerticalTitleWrapper,
  VerticalTitle,
} from "../../../../styles/Work/WorkStyle";

function VerticalEdit() {
  const { id } = useParams();
  const data = useContext(WorkDataContext);
  const input = useContext(WorkInputContext);
  const get = useContext(WorkGetContext);
  const { writing_mode } = useContext(WritingModeContext);

  useEffect(() => {
    get.getWork(id);
  }, [id]);

  useEffect(() => {
    get.handleSettingWork(data.work.title, data.work.content);
  }, [writing_mode]);

  return (
    <WorkWrapper>
      <VerticalWorkWrapper>
        <VerticalContentWrapper>
          <VerticalManuscriptPaper />
          <VerticalContent
            contentEditable="true"
            data-placeholder="本文"
            id="content"
            aria-required
            onKeyDown={input.handleContentKeyDown}
            onInput={input.handleInputContent}
            onCompositionStart={() => input.setInputting(true)}
            onCompositionEnd={() => input.setInputting(false)}
          />
        </VerticalContentWrapper>
        <VerticalTitleWrapper>
          <VerticalTitle
            contentEditable="true"
            data-placeholder="タイトル"
            id="title"
            aria-required
            onKeyDown={input.handleTitleKeyDown}
            onInput={input.handleInputTitle}
            onCompositionStart={() => input.setInputting(true)}
            onCompositionEnd={() => input.setInputting(false)}
          />
        </VerticalTitleWrapper>
      </VerticalWorkWrapper>
    </WorkWrapper>
  );
}

export default VerticalEdit