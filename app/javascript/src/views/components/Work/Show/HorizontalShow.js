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
  const get = useContext(WorkGetContext)
  const data = useContext(WorkDataContext)
  const { id } = useParams()
  const navigate = useNavigate()
  let num_lines = getNumLines(data.work.content, 20, 0)
  console.log(num_lines)

  useEffect(() => {
    get.getWork(id)
  }, [id])

  return (
    <WorkWrapper>
      <HorizontalWorkWrapper>
        <button onClick={() => navigate(`/works/${data.work.id}/edit`)}>編集</button>
        <HorizontalTitleWrapper>
          <HorizontalTitle id="title" />
        </HorizontalTitleWrapper>
        <HorizontalContentWrapper lines={num_lines}>
          <HorizontalManuscriptPaper lines={num_lines}/>
          <HorizontalContent id="content" />
        </HorizontalContentWrapper>
      </HorizontalWorkWrapper>
    </WorkWrapper>
  );
}

export default HorizontalShow