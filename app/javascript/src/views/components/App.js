import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css"
import { RouteAuthGuard } from './RouteAuthGuard'

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
import Top from '../pages/Top'

// context
import { AuthProvider } from '../../context/AuthContext';
import { WorkProvider } from '../../context/WorkContext'
import { WritingModeProvider } from '../../context/WritingModeContext'

function App() {
  return (
    <div id="zumezume">
      <AuthProvider>
        <WorkProvider>
          <WritingModeProvider>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/:name" element={<User />}/> 
              <Route exact path="/profile/setting" element={
                <RouteAuthGuard component={<EditUser />} redirect="/login" />
              } />

              <Route exact path="/works/:id/edit" element={
                <RouteAuthGuard component={<EditWork />} redirect="/login" />
              } />
              <Route exact path="/works/new" element={
                <RouteAuthGuard component={<PostWork />} redirect="/login" />
              } />
              <Route exact path="/works/:id" element={<ShowWork />} />
              <Route exact path="/works" element={<Top />} />
            </Routes>
          </WritingModeProvider>
        </WorkProvider>
      </AuthProvider>
    </div>
  )
}

export default App