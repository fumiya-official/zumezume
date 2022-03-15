import React from 'react'
import AxiosWrapper from '../../../../request/AxiosWrapper';
import { useParams } from 'react-router-dom'
import {
  Overlay,
  ModalWindowWrapper,
  Content,
  Text,
  ButtonWrapper,
  Button
} from '../../../../styles/ModalWindow';


const DeleteComment = (props) => {
  const { id } = useParams()

  const handleDelete = () => {
    AxiosWrapper.delete(`work/comments/${props.delete_comment_id}`, { withCredentials: true})
    .then((resp) => {
      console.log('delete')
      console.log(resp)
      location.href = `http://localhost:3000/works/${id}`
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleCancel= () => props.setShowDeleteModal(false)

  return (
    <>
      <Overlay>
        <ModalWindowWrapper>
          <Content>
            <Text>コメントを削除しますか？</Text>
            <ButtonWrapper>
              <Button onClick={handleDelete}>削除</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button onClick={handleCancel}>キャンセル</Button>
            </ButtonWrapper>
          </Content>
        </ModalWindowWrapper>
      </Overlay>
    </>
  )
}

export default DeleteComment