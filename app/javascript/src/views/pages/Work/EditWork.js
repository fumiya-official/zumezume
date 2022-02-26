import React, { useContext } from 'react'
import PostNavBar from '../../components/NavBar/PostNavBar'
import HorizontalEdit from '../../components/Work/Edit/HorizontalEdit'
import VerticalEdit from '../../components/Work/Edit/VerticalEdit'
import { WritingModeContext } from '../../../context/WritingModeContext'

function EditWork() {
  const { writing_mode } = useContext(WritingModeContext)

  return (
    <>
      <PostNavBar action={"edit"} />
      {writing_mode ? <HorizontalEdit /> : <VerticalEdit />}
    </>
  )
}

export default EditWork