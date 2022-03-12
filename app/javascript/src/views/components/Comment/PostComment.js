import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateAuthContext } from '../../../context/AuthContext';
import AxiosWrapper from '../../../request/AxiosWrapper'
import {
  PostCommentWrapper,
  InputComment,
  SubmitButtonWrapper,
  SubmitButton
} from '../../../styles/Comment/CommentStyle';

const PostComment = (props) => {
  const [new_comment, setNewComment] = useState("");
  const { state } = useContext(StateAuthContext)
  const navigation = useNavigate()

  const handleFocus = () => {
    // ログインしていなければログインページに遷移
    if (!state.auth) navigation("/login")
  }

  const handleInputComment = (event) => setNewComment(event.target.innerText)

  const handleSubmit = (event) => {
    event.preventDefault();

    const comment = {
      user_id: state.id,
      work_id: props.work_id,
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
          onFocus={handleFocus}
        />
        <SubmitButtonWrapper>
          <SubmitButton onClick={handleSubmit}>投稿</SubmitButton>
        </SubmitButtonWrapper>
      </PostCommentWrapper>
    </>
  );
}

export default PostComment