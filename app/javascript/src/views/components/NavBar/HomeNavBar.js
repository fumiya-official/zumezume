import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoDiv from "./Division/LogoDiv";
import { DispatchAuthContext } from "../../../context/AuthContext";
import Cookies from 'js-cookie'
import AxiosWrapper from '../../../request/AxiosWrapper'

const NavBarWrapper = styled.div`
  height: 2.5rem;
  border-bottom: solid 0.1px #c0c0c0;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
  margin-left: 1rem;
`

const Left = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
`

const Center = styled.div``

const Right = styled.div`
  div {
    display: inline-block;
  }
  color: #fff;
  text-align: center;
  font-size: 0.93rem;
`

const LogoutWrapper = styled.div`
  margin: 0 0.5em;
`

const Logout = styled.button`
  display: inline-block;
  padding: 0.1em 1em;
  text-decoration: none;
  background: #f7f7f7;
  color: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;

  a {
    color: inherit;
  }

  &:hover {
    color: #ba6661;
    border: solid 1px #ba6661;
    cursor: pointer;
  }
`

const WriteWrapper = styled.div`
  margin: 0 0.5em;
`

const Write = styled.div`
  display: inline-block;
  padding: 0.1em 1em;
  text-decoration: none;
  background: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;

  &:hover {
    background-color: #7a4340;
    border: solid 1px #7a4340;
    cursor: pointer;
  }

  a {
    color: #fff;
  }
`;

const HomeNavBar = () => {
  const { dispatch } = useContext(DispatchAuthContext)

  const handleLogout = (event) => {
    event.preventDefault()

    AxiosWrapper
      .delete("/auth/sign_out",
        {
          headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
          }
        },
        { withCredentials: true }
      )
      .then((resp) => {
        dispatch({
          type: "FAILED",
          name: null
        })
        AxiosWrapper.defaults.headers.common['X-CSRF-Token'] = resp.headers['x-csrf-token']
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        location.href = 'http://localhost:3000/login'
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <NavBarWrapper>
        <Header>
          <Left>
            <LogoDiv />
          </Left>
          <Right>
            <LogoutWrapper>
              <Logout onClick={handleLogout}>
                ログアウト
              </Logout>
            </LogoutWrapper>
            <WriteWrapper>
              <Write>
                <Link to="/works/new">執筆</Link>
              </Write>
            </WriteWrapper>
          </Right>
        </Header>
      </NavBarWrapper>
    </>
  )
}

export default HomeNavBar
