import React, { useContext } from 'react'
import PostNavBar from '../../components/NavBar/PostNavBar'
import HorizontalPost from '../../components/Work/Post/HorizontalPost'
import VerticalPost from '../../components/Work/Post/VerticalPost'
import { WritingModeContext } from '../../../context/WritingModeContext'

function PostWork () {
  /**
   * @type {Boolean} writing_mode 書き方モード[横=1 or 縦=0]
   */
  const { writing_mode } = useContext(WritingModeContext)

  return (
    <>
      <PostNavBar action={"post"} />
      {writing_mode ? <HorizontalPost /> : <VerticalPost />}
    </>
  )
}

export default PostWork