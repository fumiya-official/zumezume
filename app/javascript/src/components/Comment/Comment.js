import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AxiosWrapper from "../../request/AxiosWrapper";
import { StateAuthContext } from "../../context/AuthContext";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import DeleteComment from "./DeleteComment"
import PostComment from "./PostComment";

const CommentsWrapper = styled.div`
  font-family: "ヒラギノ角ゴ ProN W3", HiraKakuProN-W3, 游ゴシック, "Yu Gothic",
    メイリオ, Meiryo, Verdana, Helvetica, Arial, sans-serif;
  min-width: 500px;
  display: block;
  text-align: center;
`;

const ShowCommentsWrapper = styled.div`
  margin: auto;
  margin-bottom: 5em;
  text-align: left;
  display: inline-block;
`;

const CommentWrapper = styled.div`
  padding: 1.5em 0;
`;

const CommentContainer = styled.div`
  display: block;
`

const CommentBox = styled.div`
  position: relative;
  width: 500px;
  display: inline-block;
  border-top: solid 1px #96514d;
  border-bottom: solid 1px #96514d;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const MoreReadCheck = styled.input`
  display: none;

  &:checked ~ label:before {
    background: inherit;
  }

  &:checked ~ label:after {
    content: "閉じる";
  }

  &:checked ~ div {
    height: auto;
    padding-bottom: ${(props) => props.padding_bottom}px; /*閉じるボタンのbottomからの位置*/
    transition: all 600ms;
  }

  &:checked ~ div:before {
    display: none;
  }
`;

const MoreReadLabel = styled.label`
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 80px;
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
    line-height: 1.5rem;
    position: absolute;
    z-index: 2;
    font-size: 12px;
    width: 6.5rem;
    left: 50%;
    /* bottom: 20px; */
    content: "続きをよむ";
    transform: translateY(255%) translateX(-50%);
    -webkit-transform: translateY(255%) translateX(-50%);
    letter-spacing: 0.05em;
    color: #96514d;
    border: solid 1px #96514d;
    border-radius: 20px;
    background-color: #fff;

    &:hover {
      cursor: pointer;
    }
  }
`;

const CommentContent = styled.div`
  font-size: 14px;
  position: relative;
  overflow: hidden;
  max-height: 122px; /*隠した状態の高さ*/
  transition: all 600ms;
  padding: 0.5em 1em;
  white-space: pre-wrap;
  outline: none;
`;

const EditButtonWrapper = styled.div`
  display: none;
  text-align: right;
  padding-top: 0.5em;
`
const EditButton = styled.div`
  display: inline-block;
  padding-right: 0.5em;
`;

const CancelButton = styled.button`
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

const PostButton = styled.button`
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

const IconWrapper = styled.div`
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

const DropdownWrapper = styled.div`
  font-size: 14px;
  display: none;
`;

const DropdownListWrapper = styled.div`
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

const DropdownList = styled.ul`
  padding: 0;
  margin: auto 0;
  width: 100%;
`;

const ListItem = styled.li`
  display: block;
  list-style: none;
  color: #000;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #eee;
  }
`;

const ListContent = styled.div`
  display: inline-block;
`;

const IconBox = styled.div`
  display: inline-block;

  & > svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Comment(props) {
  const [comments, setComments] = useState([]);
  const [show_edit_button, setShowEditButton] = useState(false)
  const { state } = useContext(StateAuthContext);
  const [show_delete_modal, setShowDeleteModal] = useState(false)
  const [delete_comment_id, setDeleteCommentId] = useState(null)
  const [edit_comment, setEditComment] = useState({
    user_id: state.id,
    work_id: props.work_id,
    comment: null,
  });

  useEffect(() => {
    AxiosWrapper.get("/work/comments", { params: { work_id: props.work_id } })
      .then((resp) => {
        setComments(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.work_id]);

  const handleCheckReadMore = (id) => {
    const comment_id = "check-read-more-" + id;
    document.getElementById(comment_id).checked =
      !document.getElementById(comment_id).checked;
  };

  const getNumLine = (text) => {
    const word_count_per_line = 34
    const text_split_new_line = text.split(/\n/)
    let num_line = 0;
    
    text_split_new_line.forEach(elem => {
      num_line = num_line + Math.ceil(elem.length / word_count_per_line)
    })
    // console.log('split text: ' + text_split_new_line + ' num_line: ' + num_line)
    return num_line
  }

  const handleShowDropdown = (id) => {
    console.log(document.getElementById(`dropdown-menu-${id}`).style.display)
    document.getElementById(`dropdown-menu-${id}`).style.display === "none"
      ? (document.getElementById(`dropdown-menu-${id}`).style.display = "flex")
      : (document.getElementById(`dropdown-menu-${id}`).style.display = "none")
  }

  const handleInput = (event) => {
    setEditComment({...edit_comment, comment: event.target.innerText})
  }

  const handleCancel = (id) => {
    setShowEditButton(false)
    document.getElementById(`comment-${id}`).contentEditable = "false";
    document.getElementById(`edit-button-${id}`).style.display = "none";
  }

  const handlePost = (id) => {
    AxiosWrapper.patch(`/work/comments/${id}`, { comment: edit_comment }, { withCredentials: true })
      .then((resp) => {
        console.log(resp)
        handleCancel(id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClickEdit = (id) => {
    if (show_edit_button) {
      alert("他の編集中コメントを投稿またはキャンセルしてください")
    } else {
      setShowEditButton(true)
      document.getElementById(`comment-${id}`).contentEditable = "true";
      document.getElementById(`edit-button-${id}`).style.display = "block";
    }
  }

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true)
    setDeleteCommentId(id)
  }

  return (
    <>
      <CommentsWrapper>
        <PostComment work_id={props.work_id} />
        <ShowCommentsWrapper>
          {comments.map((com) => {
            const { id, comment } = com;
            const num_lines = getNumLine(comment)
            let padding_bottom = 0
            let show_more_read = false
            
            if (num_lines > 5) {
              show_more_read = true
              padding_bottom = (num_lines - 5) * 23 // px
            }
            
            // console.log('num_line: ' + num_lines + 'show: ' + show_more_read + 'comment: ' + comment)
            return (
              <CommentWrapper key={id}>
                <CommentContainer>
                  <CommentBox>
                    { show_more_read && (
                      <>
                        <MoreReadCheck id={"check-read-more-" + id} type="checkbox" padding_bottom={padding_bottom} />
                        <MoreReadLabel
                          onClick={() => {
                            handleCheckReadMore(id);
                          }}
                        />
                      </>                
                    )}
                    <CommentContent
                      id={`comment-${id}`}
                      onInput={handleInput}
                    >
                      {comment}
                    </CommentContent>
                  </CommentBox>
                  <IconWrapper className="icon-wrapper" >
                    <IconContext.Provider value={{ color: "#777", size: "20px" }} >
                      <BsThreeDotsVertical className="three-dots-icon" onClick={() => handleShowDropdown(id)}/>
                    </IconContext.Provider>
                    <DropdownWrapper id={"dropdown-menu-" + id}>
                      <DropdownListWrapper>
                        <DropdownList>
                          <ListItem onClick={() => handleClickEdit(id)}>
                            <IconBox>
                              <IconContext.Provider value={{ color: "#777", size: "16px" }}>
                                <AiFillEdit />
                              </IconContext.Provider>
                            </IconBox>
                            <ListContent>
                              編集
                            </ListContent>
                          </ListItem>
                          <ListItem onClick={() => handleShowDeleteModal(id)}>
                            <IconBox>
                              <IconContext.Provider value={{ color: "#777", size: "16px" }}>
                                <MdDelete />
                              </IconContext.Provider>
                            </IconBox>
                            <ListContent>
                              削除
                            </ListContent>
                          </ListItem>
                        </DropdownList>
                      </DropdownListWrapper>           
                    </DropdownWrapper>
                    {show_delete_modal && (
                      <DeleteComment delete_comment_id={delete_comment_id} work_id={props.work_id} setShowDeleteModal={setShowDeleteModal}/>
                    )}
                  </IconWrapper>
                </CommentContainer>
                <EditButtonWrapper id={`edit-button-${id}`}>
                  <EditButton>
                    <CancelButton onClick={() => handleCancel(id)}>キャンセル</CancelButton>
                  </EditButton>
                  <EditButton>
                    <PostButton onClick={() => handlePost(id)}>投稿</PostButton>
                  </EditButton>
                </EditButtonWrapper>
              </CommentWrapper>
            );
          })}
        </ShowCommentsWrapper>
      </CommentsWrapper>
    </>
  );
}

export default Comment;
