import React from 'react'
import { editComment } from "../../../../request/api/comment"
import {
  EditButtonWrapper,
  EditButton,
  CancelButton,
  PostButton
} from "../../../../styles/Comment/CommentStyle";

export const EditComment = (props) => {
  
  const handlePost = async (id) => {
    try {
      const resp = await editComment(id, props.edit_comment)
      handleCancel(id);
    }
    catch(err) {

    }
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