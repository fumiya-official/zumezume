import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css"
import { RouteAuthGuard } from './RouterAuthGuard'

// 認証
import Login from './Auth/Login'
import Signup from './Auth/Signup'

// ユーザページ
import Home from './User/Home'

// 作品
import EditWork from './Work/EditWork'
import PostWork from './Work/PostWork'
import ShowWork from './Work/ShowWork'
import WorkList from './Work/WorkList'
import { WritingModeProvider } from './Work/WritingModeContext'


function App() {
  return (
    <>
      <WritingModeProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          <Route exact path="/" element={
            <RouteAuthGuard component={<Home />} redirect="/login" />
          } />

          <Route exact path="/works/:id/edit" element={
            <RouteAuthGuard component={<EditWork />} redirect="/works" />
          } />
          <Route exact path="/works/new" element={
            <RouteAuthGuard component={<PostWork />} redirect="/works" />
          } />
          <Route exact path="/works/:id" element={<ShowWork />} />
          <Route exact path="/works" element={<WorkList />} />
        </Routes>
      </WritingModeProvider>
    </>
  )
}

export default App
