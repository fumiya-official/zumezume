import React from "react";
import { Link } from "react-router-dom";
import logo from '../../../../../../assets/images/zumezume_logo.png'
import {
  LogoWrapper,
  Logo
} from "../../../../styles/NavBar/Division/DivisionStyle";


const LogoDiv = () => {
  return (
    <>
      <LogoWrapper>
        <Link to="/works">
          <Logo src={logo} className="App-logo" alt="logo" />
        </Link>
      </LogoWrapper>
    </>
  );
}

export default LogoDiv