import React from 'react'
import AxiosWrapper from "../../../../request/AxiosWrapper";
import {
  EditButtonWrapper,
  EditButton,
  CancelButton,
  PostButton
} from "../../../../styles/Comment/CommentStyle";

const EditComment = (props) => {
  const handlePost = (id) => {
    AxiosWrapper.patch(
      `/work/comments/${id}`,
      { comment: props.edit_comment },
      { withCredentials: true }
    )
      .then((resp) => {
        console.log(resp);
        handleCancel(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (id) => {
    props.setShowEditButton(false);
    document.getElementById(`comment-${id}`).contentEditable = "false";
    document.getElementById(`edit-button-${id}`).style.display = "none";
  };

  return (
    <>
      <EditButtonWrapper id={`edit-button-${props.id}`}>
        <EditButton>
          <CancelButton onClick={() => handleCancel(props.id)}>
            キャンセル
          </CancelButton>
        </EditButton>
        <EditButton>
          <PostButton onClick={() => handlePost(props.id)}>投稿</PostButton>
        </EditButton>
      </EditButtonWrapper>
    </>
  );
}

export default EditComment