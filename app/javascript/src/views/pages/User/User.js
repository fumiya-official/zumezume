import React from 'react'
import UserNavBar from '../../components/NavBar/UserNavBar'
import Profile from '../../components/User/Profile'
import WorkList from '../../components/User/WorkList'

function User() {
  return (
   <>
    <UserNavBar />
    <Profile />
    <WorkList />
   </>
  )
}

export default User