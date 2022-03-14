import styled from 'styled-components'

export const CommentsWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    /* モバイルフォン */
    font-size: 12px;
  }

  @media only screen and (min-width: 480px) and (max-width: 1024px) {
    /* タブレット */
    font-size: 14px;
  }

  @media only screen and (min-width: 1024px) {
    /* PC */
    font-size: 16px;
  }

  display: block;
  font-family: "ヒラギノ角ゴ ProN W3", HiraKakuProN-W3, 游ゴシック, "Yu Gothic",
    メイリオ, Meiryo, Verdana, Helvetica, Arial, sans-serif;
  width: 31.25em;
  margin: 5em auto;
`;

export const ShowCommentsWrapper = styled.div`
  margin: auto;
  margin-bottom: 5em;
  text-align: left;
  display: inline-block;
`;

export const CommentWrapper = styled.div`
  padding: 1.5em 0;
`;

export const CommentContainer = styled.div`
  display: block;
`;

export const CommentBox = styled.div`
  position: relative;
  width: 29.4em;
  display: inline-block;
  border-top: solid 1px #96514d;
  border-bottom: solid 1px #96514d;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const CommentAuthorWrapper = styled.div`
  padding-left: 0.5em;
`

export const CommentAuthor = styled.div`
  font-size: 0.75em;
  color: #777;
`

export const MoreReadCheck = styled.input`
  display: none;

  &:checked ~ label:before {
    background: inherit;
  }

  &:checked ~ label:after {
    content: "閉じる";
  }

  &:checked ~ div {
    height: auto;
    padding-bottom: ${(props) =>
      props.padding_bottom}em; /*閉じるボタンのbottomからの位置*/
    transition: all 600ms;
  }

  &:checked ~ div:before {
    display: none;
  }
`;

export const MoreReadLabel = styled.label`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 6em;
  text-align: center;

  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.9) 100%,
    rgba(255, 255, 255, 0.9) 0%,
    #fff 100%
  );
  background: linear-gradient(
    top,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.9) 100%,
    rgba(255, 255, 255, 0.9) 0%,
    #fff 100%
  );

  &:hover {
    cursor: pointer;
  }

  &:after {
    line-height: 1.5em;
    position: absolute;
    z-index: 2;
    font-size: 0.75em;
    width: 6.5em;
    left: 50%;
    bottom: 3.4em;
    content: "続きをよむ";
    transform: translateY(255%) translateX(-50%);
    -webkit-transform: translateY(255%) translateX(-50%);
    letter-spacing: 0.05em;
    color: #96514d;
    border: solid 1px #96514d;
    border-radius: 20px;
    background-color: #fff;
  }
`;

export const CommentContent = styled.div`
  font-size: 0.875em;
  overflow: hidden;
  max-height: 7.625em; /*隠した状態の高さ*/
  transition: all 600ms;
  padding: 0.5em 1em;
  white-space: pre-wrap;
  outline: none;
`;

export const EditButtonWrapper = styled.div`
  display: none;
  text-align: right;
  padding-top: 0.5em;
`;
export const EditButton = styled.div`
  display: inline-block;
  padding-right: 0.5em;
`;

export const CancelButton = styled.button`
  padding: 0.1em 1em;
  text-decoration: none;
  background: #fff;
  border: solid 1px #96514d;
  border-radius: 3px;
  color: #96514d;

  &:hover {
    color: #7a4340;
    border-color: #7a4340;
    cursor: pointer;
  }
`;

export const PostButton = styled.button`
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

export const IconWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 0.3em;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:hover .three-dots-icon > path {
    color: #222;
  }
`;

export const DropdownWrapper = styled.div`
  font-size: 0.875em;
  display: none;
`;

export const DropdownListWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 1em;
  left: 2.2em;
  width: 4em;
  height: 3.5em;
  line-height: 1.6em;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0.3em #aaa;
`;

export const DropdownList = styled.ul`
  padding: 0;
  margin: auto 0;
  width: 100%;
`;

export const ListItem = styled.li`
  display: block;
  list-style: none;
  color: #000;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #eee;
  }
`;

export const ListContent = styled.div`
  display: inline-block;
`;

export const IconBox = styled.div`
  display: inline-block;

  & > svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PostCommentWrapper = styled.div`
  width: 31.25em;
  padding-bottom: 2.5em;
  margin: auto;
  
  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #e0e0e0;
  }
`;

/* Comment.jsのコメント表示と同じ設定 */
export const InputComment = styled.div`
  font-size: 0.875em;
  width: 31em;
  padding: 0.3em 0.5em;
  margin-right: auto; /* 左寄せ */
  outline: none;
  border-bottom: solid 2px #777;
  text-align: left;

  &:hover {
    cursor: text;
    border-bottom: solid 3px #333;
  }

  &:focus {
    border-bottom: solid 3px #333;
  }
`;

export const SubmitButtonWrapper = styled.div`
  width: 28em;
  padding-top: 1em;
  text-align: right;
`;

export const SubmitButton = styled.button`
  font-size: 0.875em;
  padding: 0.05em 0.5em;
  text-decoration: none;
  background: #fff;
  border: solid 1px #b25f5d;
  border-radius: 3px;
  color: #b25f5d;

  &:hover {
    color: #96514d;
    border: solid 1px #96514d;
    cursor: pointer;
  }
`;