import React from 'react'
import { deleteComment } from "../../../../request/api/comment"
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

  const handleDelete = async () => {
    try {
      const resp = await deleteComment(props.delete_comment_id)
      location.href = `http://localhost:3000/works/${id}`
    }
    catch(err) {

    }
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