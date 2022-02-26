import React, { useState } from 'react';
import AxiosWrapper from '../../../request/AxiosWrapper'
import {
  PostCommentWrapper,
  InputComment,
  SubmitButtonWrapper,
  SubmitButton
} from '../../../styles/Comment/CommentStyle';

const PostComment = (props) => {
  const [new_comment, setNewComment] = useState("");
  
  const handleInputComment = (event) => {
    console.log(event.target.innerText)
    setNewComment(event.target.innerText)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const comment = {
      user_id: 1,
      work_id: 1,
      comment: new_comment,
    };

    AxiosWrapper.post(
      "/work/comments",
      { comment: comment },
      { withCredentials: true }
    )
      .then((resp) => {
        console.log(resp.data);
        location.href = `http://localhost:3000/works/${props.work_id}`
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PostCommentWrapper>
        <InputComment
          id="comment"
          contentEditable="true"
          placeholder="コメントをする"
          onInput={handleInputComment}
        />
        <SubmitButtonWrapper>
          <SubmitButton onClick={handleSubmit}>投稿</SubmitButton>
        </SubmitButtonWrapper>
      </PostCommentWrapper>
    </>
  );
}

export default PostComment