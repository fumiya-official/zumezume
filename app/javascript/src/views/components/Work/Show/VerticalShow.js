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
  const get = useContext(WorkGetContext);
  const data = useContext(WorkDataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get.getWork(id);
  }, [id]);

  return (
    <WorkWrapper>
      <button onClick={() => navigate(`/works/${data.work.id}/edit`)}>編集</button>
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