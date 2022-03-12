import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import AxiosWrapper from '../../../request/AxiosWrapper'
import { Link } from 'react-router-dom'
import { getDate } from './utils/date'

const WorkListWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    /* モバイルフォン */
    font-size: 12px;
  }

  @media only screen and (min-width: 480px) and (max-width: 1024px) {
    /* タブレット */
    font-size: 14px;
  }

  @media only screen and (min-width: 1024px) {
    /* PC */
    font-size: 16px;
  }

  display: block;
  padding: 1em 10em;
  margin-top: 2em;
`;

const WorkWrapper = styled.div`
  width: 65%;
  margin: 0 auto 2.5em auto;
`;

const Work = styled.div`
  padding: 0 1em;
  border-left: solid 10px #96514d;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f8f8f8;
  }
`;
const Header = styled.header`
  
`

const Author = styled.div`
  display: inline-block;
  font-size: 0.875em;
  padding-right: 0.5em;
  color: #777;
`;

const PostTime = styled.div`
  display: inline-block;
  font-size: 0.75em;
  color: #777;
`;

const Title = styled.div`
  font-size: 1.125em;
  font-weight: bold;
  letter-spacing: 0.02em;
`;

function WorkList() {
  const { name } = useParams()
  const [works, setWorks] = useState([])
  const [nickname, setNickname] = useState()

  const getUser = () => {
    AxiosWrapper.get("/user/users", {
      params: {
        name: name,
      },
    })
      .then((resp) => {
        console.log(resp);
        setNickname(resp.data.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    AxiosWrapper.get('/work/works', {
      params: {
        name: name
      }
    })
      .then((resp) => {
        setWorks(resp.data)
        console.log(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
    
    getUser()
  }, [name])
  

  return (
    <WorkListWrapper>
      {works
        .filter((work) => {
          if (work.release) return work
        })
        .map((work) => {
          const { id, title, updated_at } = work
          const date = getDate(updated_at)
          return (
            <Link to={`/works/${id}`} key={id} >
              <WorkWrapper>
                <Work>
                  <Header>
                    <Author>{nickname ? nickname : name}</Author>
                    <PostTime>{date}</PostTime>
                  </Header>
                  <Title>{title}</Title>
                </Work>
              </WorkWrapper>
            </Link>
          )
        })
      }
    </WorkListWrapper>
  )
}

export default WorkList