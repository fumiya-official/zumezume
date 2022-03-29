import React, { useState, useEffect, useContext } from "react";
import { getComments } from "../../../request/api/comment"
import { StateAuthContext } from "../../../context/AuthContext";
import { getNumLines } from "../Work/utils/characterLimit";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteCommentButton from "./Divison/Button/DeleteCommentButton";
import {PostComment} from "./Divison/PostComment";
import EditComment from "./Divison/EditComment";
import EditCommentButton from "./Divison/Button/EditCommentButton";
import {
  CommentsWrapper,
  ShowCommentsWrapper,
  CommentWrapper,
  CommentContainer,
  CommentBox,
  CommentAuthorWrapper,
  CommentAuthor,
  MoreReadCheck,
  MoreReadLabel,
  CommentContent,
  IconWrapper,
  DropdownWrapper,
  DropdownListWrapper,
  DropdownList
} from "../../../styles/Comment/CommentStyle";


function Comment(props) {
  /**
   * @param {Object} state - ユーザ情報
   * @type {[Array, Function]} - comments
   * @type {[boolean, Function]} - show_edit_button; true: 表示, false: 非表示
   * @type {[Object, Function]} - edit_comment; 編集コメント
   *  @property {number} user_id - ユーザのid
   *  @property {number} work_id - コメントしている作品のid
   *  @property {string} comment - コメント内容
   */
  const { state } = useContext(StateAuthContext);
  const [comments, setComments] = useState([]);
  const [show_edit_button, setShowEditButton] = useState(false);
  const [edit_comment, setEditComment] = useState({
    user_id: state.id,
    work_id: props.work_id,
    comment: null,
  });

  const handleGetComments = async () => {
    try {
      const resp = await getComments(props.work_id)
      setComments(resp.data)
    }
    catch(err) {

    }
  }

  useEffect(() => {
    handleGetComments()
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

  return (
    <>
      <CommentsWrapper>
        <PostComment work_id={props.work_id} />
        <ShowCommentsWrapper>
          {comments.map((com) => {
            const { id, comment, author, author_id } = com;
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
                    <CommentAuthorWrapper>
                      <CommentAuthor>{author ? author : author_id}さん</CommentAuthor>
                    </CommentAuthorWrapper>
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
                          <EditCommentButton id={id} show_edit_button={show_edit_button} setShowEditButton={setShowEditButton} />
                          <DeleteCommentButton id={id} />
                        </DropdownList>
                      </DropdownListWrapper>
                    </DropdownWrapper>
                  </IconWrapper>
                </CommentContainer>
                <EditComment id={id} edit_comment={edit_comment} setShowEditButton={setShowEditButton} />
              </CommentWrapper>
            );
          })}
        </ShowCommentsWrapper>
      </CommentsWrapper>
    </>
  );
}

export default Comment;