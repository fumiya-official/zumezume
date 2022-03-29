import React, { useContext, useEffect } from "react";
import HorizontalShow from "../../components/Work/Show/HorizontalShow";
import VerticalShow from "../../components/Work/Show/VerticalShow";
import Comment from "../../components/Comment/Comment";
import { WritingModeContext } from "../../../context/WritingModeContext";
import { useParams } from "react-router-dom";
import ShowNavBar from "../../components/NavBar/ShowNavBar";
import { WorkGetContext } from "../../../context/WorkContext";

function ShowWork() {
  const { writing_mode } = useContext(WritingModeContext)
  const { id } = useParams()
  const get = useContext(WorkGetContext)

  useEffect(() => {
    get.handleGetWork(id)
  }, [id])

  return (
    <>
      <ShowNavBar work_id={id}/>
      {writing_mode ? <HorizontalShow /> : <VerticalShow />}
      <Comment work_id={id} />
    </>
  )
}

export default ShowWork