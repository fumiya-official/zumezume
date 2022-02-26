import React, { useContext } from "react";
import HorizontalShow from "../../components/Work/Show/HorizontalShow";
import VerticalShow from "../../components/Work/Show/VerticalShow";
import Comment from "../../components/Comment/Comment";
import { WritingModeContext } from "../../../context/WritingModeContext";
import { useParams } from "react-router-dom";

function ShowWork() {
  const { writing_mode } = useContext(WritingModeContext)
  const { id } = useParams()
  
  return (
    <>
      {writing_mode ? <HorizontalShow /> : <VerticalShow />}
      <Comment work_id={id} />
    </>
  )
}

export default ShowWork