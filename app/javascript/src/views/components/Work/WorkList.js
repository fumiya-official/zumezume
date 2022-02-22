import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AxiosWrapper from '../../../request/AxiosWrapper'

const List = styled.div`
  width: 90vw;
  max-width: 1170px;
  margin: 3rem auto;
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Work = styled.div`
  padding: 0.5em 1em;
  border-top: solid 10px #96514d;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
`

const Title = styled.p`
  font-size: 25px;
  font-weight: bold;
`

const Content = styled.p`
  font-size: 14px;
  font-weight: lighter;
  color: #707070;
  margin-top: 0.5rem;
  max-width: 210px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`

const User = styled.p`
  font-size: 14px;
  color: #707070;
`

function WorkList() {
  const [works, setWorks] = useState([])
  
  useEffect(() => {
    AxiosWrapper
      .get("/work/works")
      .then((resp) => {
        setWorks(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <List>
        {works
          .filter((work) => {
            if (work.release == true ) {
              return work;
            }
          })
          .map((work) => {
            const { id, user_id, title, content } = work;
            return (
              <Link to={`/works/${id}`} key={id}>
                <Work>
                  <Title>{title}</Title>
                  <Content dangerouslySetInnerHTML={{ __html: content }} />
                  <User>{user_id}さん</User>
                </Work>
              </Link>
            )
          })
        }
      </List>
    </>
  )
}

export default WorkList;