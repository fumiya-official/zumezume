import React, { useState, useEffect, useContext } from "react";
import AxiosWrapper from "../../../request/AxiosWrapper";
import { StateAuthContext } from "../../../context/AuthContext";
import { getNumLines } from "../Work/utils/characterLimit";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import DeleteComment from "./Divison/DeleteComment"
import PostComment from "./PostComment";
import {
  CommentsWrapper,
  ShowCommentsWrapper,
  CommentWrapper,
  CommentContainer,
  CommentBox,
  MoreReadCheck,
  MoreReadLabel,
  CommentContent,
  EditButtonWrapper,
  EditButton,
  CancelButton,
  PostButton,
  IconWrapper,
  DropdownWrapper,
  DropdownListWrapper,
  DropdownList,
  ListItem,
  ListContent,
  IconBox
} from "../../../styles/Comment/CommentStyle";


function Comment(props) {
  /**
   * @param {Object} state - ユーザ情報
   * @type {[Array, Function]} - comments
   * @type {[boolean, Function]} - show_edit_button; true: 表示, false: 非表示
   * @type {[boolean, Function]} - show_delete_modal; true: 表示, false: 非表示
   * @type {[number, Function]} - delete_comment_id; 削除するコメントのid
   * @type {[Object, Function]} - edit_comment; 編集コメント
   *  @property {number} user_id - ユーザのid
   *  @property {number} work_id - コメントしている作品のid
   *  @property {string} comment - コメント内容
   */
  const { state } = useContext(StateAuthContext);
  const [comments, setComments] = useState([]);
  const [show_edit_button, setShowEditButton] = useState(false);
  const [show_delete_modal, setShowDeleteModal] = useState(false);
  const [delete_comment_id, setDeleteCommentId] = useState(null);
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

  const handleShowDropdown = (id) => {
    document.getElementById(`dropdown-menu-${id}`).style.display === "none"
      ? (document.getElementById(`dropdown-menu-${id}`).style.display = "flex")
      : (document.getElementById(`dropdown-menu-${id}`).style.display = "none");
  };

  const handleInput = (event) => {
    setEditComment({ ...edit_comment, comment: event.target.innerText });
  };

  const handleCancel = (id) => {
    setShowEditButton(false);
    document.getElementById(`comment-${id}`).contentEditable = "false";
    document.getElementById(`edit-button-${id}`).style.display = "none";
  };

  const handlePost = (id) => {
    AxiosWrapper.patch(
      `/work/comments/${id}`,
      { comment: edit_comment },
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

  const handleClickEdit = (id) => {
    if (show_edit_button) {
      alert("他の編集中コメントを投稿またはキャンセルしてください");
    } else {
      setShowEditButton(true);
      document.getElementById(`comment-${id}`).contentEditable = "true";
      document.getElementById(`edit-button-${id}`).style.display = "block";
    }
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteCommentId(id);
  };

  return (
    <>
      <CommentsWrapper>
        <PostComment work_id={props.work_id} />
        <ShowCommentsWrapper>
          {comments.map((com) => {
            const { id, comment } = com;
            const num_lines = getNumLines(comment, 31, 1);
            let padding_bottom = 0;
            let show_more_read = false;

            if (num_lines > 5) {
              show_more_read = true;
              padding_bottom = (num_lines - 5) * 2; // em
            }

            // console.log('num_line: ' + num_lines + 'show: ' + show_more_read + 'comment: ' + comment)
            return (
              <CommentWrapper key={id}>
                <CommentContainer>
                  <CommentBox>
                    {show_more_read && (
                      <>
                        <MoreReadCheck
                          id={"check-read-more-" + id}
                          type="checkbox"
                          padding_bottom={padding_bottom}
                        />
                        <MoreReadLabel
                          onClick={() => {
                            handleCheckReadMore(id);
                          }}
                        />
                      </>
                    )}
                    <CommentContent id={`comment-${id}`} onInput={handleInput}>
                      {comment}
                    </CommentContent>
                  </CommentBox>
                  <IconWrapper className="icon-wrapper">
                    <IconContext.Provider
                      value={{ color: "#777", size: "1.25em" }}
                    >
                      <BsThreeDotsVertical
                        className="three-dots-icon"
                        onClick={() => handleShowDropdown(id)}
                      />
                    </IconContext.Provider>
                    <DropdownWrapper id={"dropdown-menu-" + id}>
                      <DropdownListWrapper>
                        <DropdownList>
                          <ListItem onClick={() => handleClickEdit(id)}>
                            <IconBox>
                              <IconContext.Provider
                                value={{ color: "#777", size: "1em" }}
                              >
                                <AiFillEdit />
                              </IconContext.Provider>
                            </IconBox>
                            <ListContent>編集</ListContent>
                          </ListItem>
                          <ListItem onClick={() => handleShowDeleteModal(id)}>
                            <IconBox>
                              <IconContext.Provider
                                value={{ color: "#777", size: "1em" }}
                              >
                                <MdDelete />
                              </IconContext.Provider>
                            </IconBox>
                            <ListContent>削除</ListContent>
                          </ListItem>
                        </DropdownList>
                      </DropdownListWrapper>
                    </DropdownWrapper>
                    {show_delete_modal && (
                      <DeleteComment
                        delete_comment_id={delete_comment_id}
                        work_id={props.work_id}
                        setShowDeleteModal={setShowDeleteModal}
                      />
                    )}
                  </IconWrapper>
                </CommentContainer>
                <EditButtonWrapper id={`edit-button-${id}`}>
                  <EditButton>
                    <CancelButton onClick={() => handleCancel(id)}>
                      キャンセル
                    </CancelButton>
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
