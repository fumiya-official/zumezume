import React, { useState } from 'react'
import { IconContext } from "react-icons";
import { MdDelete } from "react-icons/md";
import DeleteComment from "../DeleteComment";
import {
  ListItem,
  ListContent,
  IconBox,
} from "../../../../../styles/Comment/CommentStyle";

const DeleteCommentButton = (props) => {
  /**
   * @type {[boolean, Function]} - show_delete_modal; true: 表示, false: 非表示
   * @type {[number, Function]} - delete_comment_id; 削除するコメントのid
   */
  const [show_delete_modal, setShowDeleteModal] = useState(false);
  const [delete_comment_id, setDeleteCommentId] = useState(null);

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteCommentId(id);
  };

  return (
    <>
      <ListItem onClick={() => handleShowDeleteModal(props.id)}>
        <IconBox>
          <IconContext.Provider value={{ color: "#777", size: "1em" }}>
            <MdDelete />
          </IconContext.Provider>
        </IconBox>
        <ListContent>削除</ListContent>
      </ListItem>
      {show_delete_modal && (
        <DeleteComment
          delete_comment_id={delete_comment_id}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
}

export default DeleteCommentButton