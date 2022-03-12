import React, { useContext, useEffect, useRef } from 'react'
import PostNavBar from '../../components/NavBar/PostNavBar'
import HorizontalPost from '../../components/Work/Post/HorizontalPost'
import VerticalPost from '../../components/Work/Post/VerticalPost'
import { WritingModeContext } from '../../../context/WritingModeContext'
import { WorkDataContext } from '../../../context/WorkContext'
import { StateAuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function PostWork () {
  /**
   * @type {Boolean} writing_mode 書き方モード[横=1 or 縦=0]
   * @param {Boolean} first_render true: 初回レンダー false: 初回ではないレンダー
   */
  const { writing_mode } = useContext(WritingModeContext)
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()
  const data = useContext(WorkDataContext)
  const first_render = useRef(true)

  // 初回レンダー時、コンテキストにあるデータを初期化
  useEffect(() => {
    data.setWork({
      id: null,
      title: "",
      content: "",
      user_id: null
    })
  }, [])
  
  useEffect(() => {
    if (!state.auth) navigate("/login")
  }, [state.auth])

  return (
    <>
      <PostNavBar action={"post"} />
      {writing_mode ? <HorizontalPost first_render={first_render}/> : <VerticalPost first_render={first_render}/>}
    </>
  )
}

export default PostWork