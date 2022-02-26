import styled from 'styled-components'

// HomeNavBar
export const NavBarWrapper = styled.div`
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

  height: 2.5em;
  border-bottom: solid 0.1px #c0c0c0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1em;
  margin-left: 1em;
`;

export const Left = styled.div`
  padding-top: 0.4em;
  padding-bottom: 0.2em;
`;

export const Center = styled.div``;

export const Right = styled.div`
  color: #fff;
  text-align: center;

  div {
    display: inline-block;
  }
  
  button {
    font-size: 0.875em;
  }
`;

export const ButtonWrapper = styled.div`
  margin: 0 0.5em;
`;

export const Button = styled.button`
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
    color: #7a4340;
    border: solid 1px #7a4340;
    cursor: pointer;
  }
`;

export const FillButtonWrapper = styled.div`
  margin: 0 0.5em;
`;

export const FillButton = styled.button`
  display: inline-block;
  padding: 0.1em 1em;
  text-decoration: none;
  background: #96514d;
  border: solid 1px #96514d;
  border-radius: 3px;
  color: #fff;

  &:hover {
    background-color: #7a4340;
    border: solid 1px #7a4340;
    cursor: pointer;
  }

  a {
    color: #fff;
  }
`;
