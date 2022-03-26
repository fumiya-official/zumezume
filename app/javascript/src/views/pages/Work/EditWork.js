import React, { useContext, useEffect } from 'react'
import PostNavBar from '../../components/NavBar/PostNavBar'
import HorizontalEdit from '../../components/Work/Edit/HorizontalEdit'
import VerticalEdit from '../../components/Work/Edit/VerticalEdit'
import { WritingModeContext } from '../../../context/WritingModeContext'
import { StateAuthContext } from '../../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkDataContext, WorkGetContext } from '../../../context/WorkContext'

function EditWork() {
  const { writing_mode } = useContext(WritingModeContext)
  const { state } = useContext(StateAuthContext)
  const data = useContext(WorkDataContext)
  const get = useContext(WorkGetContext)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    get.handleGetWork(id)
  }, [id])

  useEffect(() => {
    if (data.work.user_id !== state.id) navigate("/works")
  }, [data.work.user_id])

  return (
    <>
      <PostNavBar action={"edit"} />
      {writing_mode ? <HorizontalEdit /> : <VerticalEdit />}
    </>
  )
}

export default EditWork