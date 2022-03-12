import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoDiv from "./Division/LogoDiv";

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

const AuthNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <>
      <NavBarWrapper>
        <Header>
          <Left>
            <LogoDiv />
          </Left>
          <Right>
            <ButtonWrapper>
              {location.pathname === "/signup" ? (
                <Button onClick={() => navigate("/login")}>ログイン</Button>
              ) : (
                <Button onClick={() => navigate("/signup")}>登録</Button>
              )}
            </ButtonWrapper>
          </Right>
        </Header>
      </NavBarWrapper>
    </>
  );
};

export default AuthNavBar;
