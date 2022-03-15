import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css"
import { RouteAuthGuard } from './RouterAuthGuard'

// 認証
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'

// ユーザページ
import User from '../pages/User/User'
import EditUser from '../pages/User/EditUser'

// 作品
import EditWork from '../pages/Work/EditWork'
import PostWork from '../pages/Work/PostWork'
import ShowWork from '../pages/Work/ShowWork'
import { WorkProvider } from '../../context/WorkContext'
import { WritingModeProvider } from '../../context/WritingModeContext'
import Top from '../pages/Top'


function App() {
  return (
    <div id="zumezume">
      <WorkProvider>
        <WritingModeProvider>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />

            <Route exact path="/:name" element={<User />}/> 
            <Route exact path="/profile/setting" element={
              <RouteAuthGuard component={<EditUser />} redirect="/works" />
            } />

            <Route exact path="/works/:id/edit" element={
              <RouteAuthGuard component={<EditWork />} redirect="/works" />
            } />
            <Route exact path="/works/new" element={
              <RouteAuthGuard component={<PostWork />} redirect="/login" />
            } />
            <Route exact path="/works/:id" element={<ShowWork />} />
            <Route exact path="/works" element={<Top />} />
          </Routes>
        </WritingModeProvider>
      </WorkProvider>
    </div>
  )
}

export default App