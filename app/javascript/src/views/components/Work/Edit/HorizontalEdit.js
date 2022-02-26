import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { WorkDataContext, WorkGetContext, WorkInputContext } from '../../../../context/WorkContext';
import { WritingModeContext } from '../../../../context/WritingModeContext';
import {
  WorkWrapper,
  HorizontalWorkWrapper,
  HorizontalContentWrapper,
  HorizontalManuscriptPaper,
  HorizontalContent,
  HorizontalTitleWrapper,
  HorizontalTitle,
} from "../../../../styles/Work/WorkStyle";

function HorizontalEdit() {
  const { id } = useParams()
  const data = useContext(WorkDataContext)
  const input = useContext(WorkInputContext)
  const get = useContext(WorkGetContext)
  const { writing_mode } = useContext(WritingModeContext)

  useEffect(() => {
    get.getWork(id)
  }, [id])

  useEffect(() => {
    get.handleSettingWork(data.work.title, data.work.content)
  }, [writing_mode])

  return (
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
  );
}

export default HorizontalEdit