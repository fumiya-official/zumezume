import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoDiv from "./Division/LogoDiv";
import { StateAuthContext } from "../../../context/AuthContext";
import SettingDiv from "./Division/SettingDiv";
import { WorkDataContext, WorkGetContext } from "../../../context/WorkContext";
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

const ShowNavBar = (props) => {
  const { state } = useContext(StateAuthContext);
  const get = useContext(WorkGetContext)
  const data = useContext(WorkDataContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    get.getWork(props.work_id)
  }, [props.work_id])
  
  return (
    <>
      <NavBarWrapper>
        <Header>
          <Left>
            <LogoDiv />
          </Left>
          <Right>
            <ButtonWrapper>
              { state.auth ? (
                <Logout />
              ) : (
                <Button onClick={() => navigate("/login")}>ログイン</Button>
              )}
            </ButtonWrapper>
            { data.work.user_id === state.id && (
              <ButtonWrapper>
                <Button onClick={() => navigate(`/works/${props.work_id}/edit`)} >
                  編集
                </Button>
              </ButtonWrapper>
            )}
            <FillButtonWrapper>
              <FillButton>
                <Link to="/works/new">執筆</Link>
              </FillButton>
            </FillButtonWrapper>
            <SettingDiv />
          </Right>
        </Header>
      </NavBarWrapper>
    </>
  );
};

export default ShowNavBar;
