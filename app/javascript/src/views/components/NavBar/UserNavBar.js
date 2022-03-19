import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoDiv from "./Division/LogoDiv";
import { StateAuthContext } from "../../../context/AuthContext";
import Logout from "../Auth/Logout";
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
  const { state } = useContext(StateAuthContext)
  const navigate = useNavigate()

  return (
    <>
      <NavBarWrapper>
        <Header>
          <Left>
            <LogoDiv />
          </Left>
          <Right>
            <ButtonWrapper>
              {state.auth ? (
                <Logout />
              ) : (
                <Button onClick={() => navigate("/login")}>ログイン</Button>
              )}
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
  );
}

export default UserNavBar
