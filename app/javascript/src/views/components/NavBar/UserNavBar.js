import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoDiv from "./Division/LogoDiv";
import { DispatchAuthContext, StateAuthContext } from "../../../context/AuthContext";
import Cookies from 'js-cookie'
import AxiosWrapper from '../../../request/AxiosWrapper'
import {
  NavBarWrapper,
  Header,
  Left,
  Center,
  Right,
  ButtonWrapper,
  Button,
  FillButtonWrapper,
  FillButton,
} from "../../../styles/NavBar/NavBarStyle";


const UserNavBar = () => {
  const { dispatch } = useContext(DispatchAuthContext)
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()

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
            <ButtonWrapper>
              { state.auth ?
                <Button onClick={handleLogout}>
                  ログアウト
                </Button>
                :
                <Button onClick={() => navigate("/login")}>
                  ログイン
                </Button>
              }
            </ButtonWrapper>
            <FillButtonWrapper>
              <FillButton>
                <Link to="/works/new">執筆</Link>
              </FillButton>
            </FillButtonWrapper>
          </Right>
        </Header>
      </NavBarWrapper>
    </>
  )
}

export default UserNavBar
