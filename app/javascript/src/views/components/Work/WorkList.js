import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getWorks }  from '../../../request/api/work'
import { getDate } from '../User/utils/date'
import {
  ListWrapper,
  List,
  ItemWrapper,
  Item,
  Title,
  Content,
  WorkInfoWrapper,
  UserIcon,
  AuthorNickname,
  PublishDate
} from "../../../styles/Work/WorkStyle"


function WorkList() {
  const [works, setWorks] = useState([])

  const handleGetWorks = async () => {
    try {
      const resp = await getWorks()
      setWorks(resp.data)
    }
    catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    handleGetWorks()
  }, [])

  return (
    <>
      <ListWrapper>
        <List>
        {works
          .filter((work) => {
            if (work.release == true ) {
              return work;
            }
          })
          .map((work) => {
            const { id, author_id, author, title, content, updated_at } = work;
            const date = getDate(updated_at)

            return (
              <Link to={`/works/${id}`} key={id}>
                <ItemWrapper>
                  <Item>
                    <Title>{title}</Title>
                    <Content dangerouslySetInnerHTML={{ __html: content }} />
                    <WorkInfoWrapper>
                      {/* <UserIcon></UserIcon> */}
                      <AuthorNickname>{author ? author : author_id}さん</AuthorNickname>
                      <PublishDate>{date}</PublishDate>
                    </WorkInfoWrapper>
                  </Item>
                </ItemWrapper>
              </Link>
            )
          })
        }
        </List>
      </ListWrapper>
    </>
  )
}

export default WorkList;