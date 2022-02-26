import React, { useContext, useEffect } from "react";
import { WorkDataContext, WorkInputContext } from "../../../../context/WorkContext";
import { WritingModeContext } from "../../../../context/WritingModeContext";
import {
  WorkWrapper,
  VerticalWorkWrapper,
  VerticalContentWrapper,
  VerticalManuscriptPaper,
  VerticalContent,
  VerticalTitleWrapper,
  VerticalTitle
} from '../../../../styles/Work/WorkStyle'

function VerticalPost() {
  const data = useContext(WorkDataContext);
  const input = useContext(WorkInputContext)
  const { writing_mode } = useContext(WritingModeContext)

  useEffect(() => {
    if (data.work) {
      document.getElementById("title").innerHTML = data.work.title;
      document.getElementById("content").innerHTML = data.work.content;
    }
  }, [writing_mode])

  return (
    <>
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
    </>
  );
}

export default VerticalPost