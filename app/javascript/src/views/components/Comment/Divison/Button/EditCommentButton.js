import React from 'react'
import { IconContext } from "react-icons";
import { AiFillEdit } from "react-icons/ai";
import {
  ListItem,
  ListContent,
  IconBox
} from "../../../../../styles/Comment/CommentStyle"

const EditCommentButton = (props) => {

  const handleClickEdit = (id) => {
    if (props.show_edit_button) {
      alert("他の編集中コメントを投稿またはキャンセルしてください");
    } else {
      props.setShowEditButton(true);
      document.getElementById(`comment-${id}`).contentEditable = "true";
      document.getElementById(`edit-button-${id}`).style.display = "block";
    }
  };

  return (
    <>
      <ListItem onClick={() => handleClickEdit(props.id)}>
        <IconBox>
          <IconContext.Provider value={{ color: "#777", size: "1em" }}>
            <AiFillEdit />
          </IconContext.Provider>
        </IconBox>
        <ListContent>編集</ListContent>
      </ListItem>
    </>
  );
}

export default EditCommentButton