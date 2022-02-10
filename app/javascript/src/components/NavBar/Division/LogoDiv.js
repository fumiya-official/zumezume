import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from '../../../../../assets/images/zumezume_logo.png'

const Logo = styled.img`
  width: 6rem;
  height: 1.7rem;
`

const LogoDiv = () => {
  return (
    <>
      <Link to="/">
        <Logo src={logo} className="App-logo" alt="logo" />
      </Link>
    </>
  );
}

export default LogoDiv