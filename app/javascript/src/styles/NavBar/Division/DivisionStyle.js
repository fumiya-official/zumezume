import styled from 'styled-components'


// SettingDiv.js
export const SettingWrapper = styled.div`
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

  margin-left: 1em;
`;

export const DropdownWrapper = styled.div`
  margin: 0 auto;
`;

export const DropdownHeader = styled.div``;

export const IconWrapper = styled.div`
  top: 8.333em;

  &:hover {
    cursor: pointer;
  }

  &:hover path {
    color: #7a4340;
  }
`;

export const DropdownListWrapper = styled.div`
  position: absolute;
  top: 2.9rem;
  right: 0.0625em;
  min-width: 7.6em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 1px gray;
  transform: translate(-10%);
  z-index: 5;
`;

export const DropdownList = styled.ul`
  padding: 0 0.5em;
`;

export const ListItem = styled.li`
  list-style: none;
  color: #000;
`;

export const ListLabel = styled.span`
  display: block;
  text-align: left;
  font-size: 0.75em; /* if parent 16px, 12px */
  padding-bottom: 0.3em;
`;

export const ListContent = styled.div`
  display: block;
  text-align: center;
  font-size: 0.75em; /* if parent 16px, 12px */
  padding-bottom: 0.3em;
`;

export const SwtichWrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  font-family: sans-serif;
`;

export const WritingModeWrapper = styled.div`
  background: rgba(150, 81, 77, 0.56);
  border-radius: 30px;
  overflow: hidden;
  width: 100px;
  text-align: center;
  font-size: 0.667em; /* if parent 12px, 8px */
  letter-spacing: 1px;
  color: #ffffff;
  position: relative;
  padding-right: 6.25em;
  position: relative;

  &:before {
    content: "タテ";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 6.25em;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }
`;

export const SwitchCheckbox = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;

  &:checked + label:before {
    transform: translateX(50px);
    transition: transform 200ms;
  }
`;

export const SwitchLabel = styled.label`
  position: relative;
  padding: 0.625em 0;
  display: block;
  user-select: none;
  pointer-events: none;

  &:before {
    content: "";
    background: #96514d;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 30px;
    transform: translateX(0);
    transition: transform 200ms;
  }
`;

export const ModeSpan = styled.span`
  position: relative;
`;


// LogoDiv.js
export const LogoWrapper = styled.div`
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
`;

export const Logo = styled.img`
  width: 6em;
  height: 1.7em;
`;