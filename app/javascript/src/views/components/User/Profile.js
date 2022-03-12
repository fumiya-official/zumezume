import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import AxiosWrapper from '../../../request/AxiosWrapper'
import { AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons";
import { StateAuthContext } from '../../../context/AuthContext';


const ProfileWrapper = styled.div`
  @media only screen and (max-width: 480px) {
    /* モバイルフォン */
    font-size: 12px;
  }

  @media only screen and (min-width: 480px) and (max-width: 1024px) {
    /* タブレット */
    font-size: 14px;
  }

  @media only screen and (min-width: 1024px) {
    /* PC */
    font-size: 16px;
  }

  display: block;
  padding: 1em 10em;
  border-bottom: solid 0.1px #c0c0c0;
`;

const ProfileContainer = styled.div`
  width: 65%;
  margin: 0 auto;
`

const IconWrapper = styled.div`
  display: block;
`

const UserWrapper = styled.div`
  display: block;
  width: 100%;
`

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

const UserInfo = styled.div`

`
const ButtonWrapper = styled.div`
  
`;

const Button = styled.div`
  font-size: 0.75em;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 0.1em 1em;
  color: #aaa;

  &:hover {
    cursor: pointer;
    border: 1px solid #333;
    color: #333;
  }
`;

const Name = styled.div`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
`

const Id = styled.div`
  display: block;
  font-size: 0.875em;
  color: #777;
`;

function Profile() {
  const { state } = useContext(StateAuthContext)
  const { name } = useParams()
  const navigate = useNavigate()
  const [profile_setting_button, setProfileSettingButton] = useState(false)
  const [user, setUser] = useState({
    nickname: null,
    name: null
  })

  const getUser = () => {
    AxiosWrapper.get("/user/users", {
      params: {
        name: name,
      },
    })
      .then((resp) => {
        console.log(resp);
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getIdentity = () => {
    if (state.name === name) setProfileSettingButton(true)
  }

  useEffect(() => {
    getUser()
    getIdentity()
  }, [name])

  return (
    <>
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
    </>
  )
}

export default Profile