import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AxiosWrapper from "../../request/AxiosWrapper"
import { WritingModeContext } from './WritingModeContext'

const ShowWorkWrapper = styled.div`
  position: relative;
  text-align: center;
  margin: 35px auto 0 auto;
  font-family: Hiragino Mincho ProN;
`;

const HorizontalWorkWrapper = styled.div`
  justify-content: center;
  div {
    display: block;
  }
`;

const HorizontalContentWrapper = styled.div`
  margin: auto;
  min-width: 500px;
  height: 550px;
  position: relative;
`;

const HorizontalManuscriptPaper = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  content: "";
  margin: auto;
  width: 500px; // background-sizeの左右*20
  height: 600px; // background-zieの上下*20
  text-align: left;
  background-image: 
    linear-gradient(
      to bottom,
      #ffffff,
      #ffffff 10%,
      #96514d 11%,
      #96514d 12%,
      transparent 13%,
      transparent 87%,
      #96514d 88%,
      #96514d 89%,
      #ffffff 90%,
      #ffffff
    ),
    linear-gradient(
      to right,
      transparent,
      transparent 97%,
      #96514d 98%,
      #96514d
    );
  background-size: 25px 30px;
  background-position: top right;
  background-origin: padding-box;
  border: 1px solid #96514d;

  text-orientation: upright;
`;

const HorizontalContent = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  width: 520px;
  transform: translateX(-50%);
  text-align: left;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 7px;
  margin: 0;
  margin-left: 0.73em;
  margin-top: 0.05em;
  &:hover {
  }
`;

const HorizontalTitleWrapper = styled.div`
  margin: 1rem auto;
  width: 504px;
  justify-content: center;
  align-items: center;
`;

const HorizontalTitle = styled.div`
  max-width: 100%;
  min-height: 100%;
  font-size: 20px;
  letter-spacing: 3px;
  margin-top: 0.1em;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  &:hover {
    
  }

  text-orientation: upright;
`;

const VerticalWorkWrapper = styled.div`
  justify-content: center;
  div {
    display: inline-block;
    vertical-align: top;
  }

  line-height: 35px;
  letter-spacing: 7px;
`;

const VerticalContentWrapper = styled.div`
  margin: auto;
  min-width: 700px;
  height: 550px;
`;

const VerticalManuscriptPaper = styled.div`
  content: "";
  margin: auto;
  width: 700px;
  height: 504px;
  text-align: left;
  background-image: linear-gradient(
      to right,
      #ffffff,
      #ffffff 10%,
      #96514d 11%,
      #96514d 12%,
      transparent 13%,
      transparent 87%,
      #96514d 88%,
      #96514d 89%,
      #ffffff 90%,
      #ffffff
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent 97%,
      #96514d 98%,
      #96514d
    );
  background-size: 35px 25px;
  background-position: top right;
  background-origin: padding-box;
  border: 1px solid #96514d;

  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;

  text-orientation: upright;
`;

const VerticalContent = styled.div`
  font-size: 18px;
  margin: 0;
  margin-right: 0;
  margin-top: 0.2em;
  &:hover {
    cursor: vertical-text;
  }
`;

const VerticalTitleWrapper = styled.div`
  margin-left: 15px;
  height: 504px;
  justify-content: center;
  align-items: center;
`;

const VerticalTitle = styled.div`
  max-width: 100%;
  min-height: 100%;
  font-size: 20px;
  letter-spacing: 3px;
  margin-top: 0.1em;
  margin-right: auto;
  margin-left: auto;
  text-align: left;
  &:hover {
    cursor: vertical-text;
  }

  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;

  text-orientation: upright;
`;


function ShowWork() {
  const { writing_mode } = useContext(WritingModeContext)
  const [work, setWork] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  const getWork = (id) => {
    AxiosWrapper
    .get(`/work/works/${id}`)
    .then((resp) => {
      setWork(resp.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    getWork(id)
  }, [id])

  return (
    <>
      <ShowWorkWrapper>
        { writing_mode === "HORIZONTAL" ?
          <HorizontalWorkWrapper>
            <button onClick={() => {navigate(`/works/${work.id}/edit`)}}>編集</button>
            <HorizontalTitleWrapper>
              <HorizontalTitle dangerouslySetInnerHTML={{ __html: work.title }} />
            </HorizontalTitleWrapper>
            <HorizontalContentWrapper>
              <HorizontalManuscriptPaper />
              <HorizontalContent dangerouslySetInnerHTML={{ __html: work.content }} />
            </HorizontalContentWrapper>
          </HorizontalWorkWrapper>
          :
          <VerticalWorkWrapper>
            <VerticalContentWrapper>
              <VerticalManuscriptPaper>
                <VerticalContent dangerouslySetInnerHTML={{ __html: work.content }} />
              </VerticalManuscriptPaper>
            </VerticalContentWrapper>
            <VerticalTitleWrapper>
              <VerticalTitle dangerouslySetInnerHTML={{ __html: work.title }} />
            </VerticalTitleWrapper>
          </VerticalWorkWrapper>
        }
      </ShowWorkWrapper>
    </>
  )
}

export default ShowWork
