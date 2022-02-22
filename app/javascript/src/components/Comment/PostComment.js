import React, { useState } from 'react';
import styled from 'styled-components'
import AxiosWrapper from '../../request/AxiosWrapper'

const PostCommentWrapper = styled.div`
  font-size: 14px;
  width: 500px;
  padding: 1.5em 0;
  margin: auto;

  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #e0e0e0;
  }
`;

/* Comment.jsのコメント表示と同じ設定 */
const InputComment = styled.div`
  padding: 0.1em 0.5em;
  outline: none;
  width: 100%;
  border-bottom: solid 2px #777;
  letter-spacing: 0.03rem;
  line-height: 1.3rem;
  text-align: left;

  &:hover {
    cursor: text;
    border-bottom: solid 3px #333;
  }
`;

const SubmitButtonWrapper = styled.div`
  padding-top: 0.5em;
  text-align: right;
`;

const SubmitButton = styled.button`
  padding: 0.1em 1em;
  text-decoration: none;
  background: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;
  color: #fff;

  &:hover {
    background-color: #7a4340;
    border: solid 1px #7a4340;
    cursor: pointer;
  }
`;


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

    console.log(comment);
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