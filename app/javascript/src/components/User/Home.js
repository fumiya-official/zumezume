import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StateAuthContext } from '../../context/AuthContext'
import HomeNavBar from '../NavBar/HomeNavBar'

function Home() {
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()

  return (
    <>
      <HomeNavBar />
      <h1>ホームページ</h1>
      <h2>name: {state.id}</h2>
    </>
  )
}

export default Home
