import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUsers } from "../../../request/api/user"
import { AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons";
import { StateAuthContext } from '../../../context/AuthContext';
import {
  ProfileWrapper,
  ProfileContainer,
  IconWrapper,
  UserWrapper,
  UserInfoWrapper,
  UserInfo,
  ButtonWrapper,
  Button,
  Name,
  Id
} from "../../../styles/User/UserStyle"

function Profile() {
  const { state } = useContext(StateAuthContext)
  const { name } = useParams()
  const navigate = useNavigate()
  const [profile_setting_button, setProfileSettingButton] = useState(false)
  const [user, setUser] = useState({
    nickname: "",
    name: "",
    biography: ""
  })
  const [loading, setLoading] = useState(false)

  const handleGetUsers = async () => {
    try {
      const resp = await getUsers(name)
      if (resp.status == 200) {
        setUser({
          nickname: resp.data.nickname,
          name: resp.data.name,
          biography: resp.data.biography
        })
        setLoading(true)
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  const getIdentity = () => {
    if (state.name === name) setProfileSettingButton(true)
  }

  useEffect(() => {
    handleGetUsers()
    getIdentity()
  }, [name])

  return (
    <>
      { loading ? 
        <ProfileWrapper>
          <ProfileContainer>
            <IconWrapper>
              <IconContext.Provider value={{color: "96514d", size: "5em"}}>
                <AiOutlineUser />
              </IconContext.Provider>
            </IconWrapper>
            <UserWrapper>
              <UserInfoWrapper>
                <UserInfo>
                  <Name>{user.nickname ? user.nickname : user.name}</Name>
                  <Id>@{user.name}</Id>
                </UserInfo>
                {profile_setting_button &&(
                  <ButtonWrapper>
                    <Button onClick={() => navigate("/profile/setting")}>プロフィールを編集</Button>
                  </ButtonWrapper>
                )}
              </UserInfoWrapper>
              <UserInfoWrapper>
                <UserInfo>{user.biography}</UserInfo>
              </UserInfoWrapper>
            </UserWrapper>
          </ProfileContainer>
        </ProfileWrapper>
        :
        <label>・・・</label>
      }
    </>
  )
}

export default Profile