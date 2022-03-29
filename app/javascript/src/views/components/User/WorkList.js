import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWorks } from '../../../request/api/work'
import { Link } from 'react-router-dom'
import { getDate } from './utils/date'
import {
  WorkListWrapper,
  WorkWrapper,
  Work,
  Header,
  Author,
  PostTime,
  Title
} from "../../../styles/User/UserStyle"

function WorkList() {
  const { name } = useParams()
  const [works, setWorks] = useState([])

  const handleGetWorks = async () => {
    try {
      const resp = await getWorks(name)
      setWorks(resp.data)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetWorks()
  }, [name])
  

  return (
    <WorkListWrapper>
      {works
        .filter((work) => {
          if (work.release) return work
        })
        .map((work) => {
          const { id, title, author, author_id, updated_at } = work
          const date = getDate(updated_at)
          return (
            <Link to={`/works/${id}`} key={id} >
              <WorkWrapper>
                <Work>
                  <Header>
                    <Author>{author ? author : author_id}</Author>
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