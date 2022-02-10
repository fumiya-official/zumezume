import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StateAuthContext } from '../AuthContext'
import HomeNavBar from '../NavBar/HomeNavBar'

function Home() {
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // ログインしていなければログイン画面へ遷移
    if (!state.auth || !state.name) {
      navigate("/login")
    }
  })

  return (
    <>
      <HomeNavBar />
      <h1>ホームページ</h1>
      <h2>name: {state.name}</h2>
    </>
  )
}

export default Home
