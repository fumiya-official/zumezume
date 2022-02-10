import React from 'react'
import { Routes, Route } from 'react-router-dom'

// 認証
import Login from './Auth/Login'
import Signup from './Auth/Signup'

// ユーザページ
import Home from './User/Home'

import './App.css'

function App() {
  return (
    <>
     <Routes>
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/signup" element={<Signup />} />
       <Route exact path="/" element={<Home />} />
     </Routes>
    </>
  )
}

export default App
