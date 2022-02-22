import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { WritingModeContext } from "../../../../context/WritingModeContext";
import { IconContext } from "react-icons";
import { FiSettings } from "react-icons/fi";

const SettingWrapper = styled.div`
  margin-left: 1em;
`;

const DropdownWrapper = styled.div`
  margin: 0 auto;
`;

const DropdownHeader = styled.div``;

const DropdownListWrapper = styled.div`
  position: absolute;
  top: 2.9rem;
  right: 1px;
  min-width: 120px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 1px gray;
  transform: translate(-10%);
  z-index: 5;
`;

const DropdownList = styled.ul`
  padding-left: 0.5rem;
`;

const ListItem = styled.li`
  list-style: none;
  color: #000;
`;

const ListContent = styled.span`
  display: block;
  text-align: left;
  font-size: 12px;
  padding-bottom: 0.3rem;
`;

const IconWrapper = styled.div`
  top: 100px;

  &:hover {
    cursor: pointer;
  }
`;

const SwtichWrapper = styled.div`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  display: flex;
  align-items: left;
  justify-content: center;
  font-family: sans-serif;
`;

const WritingModeWrapper = styled.div`
  background: rgba(150, 81, 77, 0.56);
  border-radius: 30px;
  overflow: hidden;
  width: 100px;
  text-align: center;
  font-size: 8px;
  letter-spacing: 1px;
  color: #ffffff;
  position: relative;
  padding-right: 50px;
  position: relative;

  &:before {
    content: "タテ";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
  }
`;

const SwitchCheckbox = styled.input`
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

const SwitchLabel = styled.label`
  position: relative;
  padding: 5px 0;
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

const ModeSpan = styled.span`
  position: relative;
`;


const SettingDiv = () => {
  const [open, setOpen] = useState(false);
  const { writing_mode, handleClickModeChange, width } = useContext(WritingModeContext);
  
  // タテ書きモードの時にスイッチの初期位置を"タテ"にシフト
  useEffect(() => {
    if (writing_mode === "VERTICAL" && open) document.getElementById("switch-checkbox").checked = true
  }, [open])

  // ウィンドウサイズが変更して、タテからヨコに変更したときスイッチの位置を"ヨコ"にシフト
  useEffect(() => {
    if (open && width < 900) document.getElementById("switch-checkbox").checked = false
  }, [width])

  const toggling = () => setOpen(!open);

  return (
    <>
      <SettingWrapper>
        <DropdownWrapper>
          <DropdownHeader onClick={toggling}>
            <IconWrapper>
              <IconContext.Provider value={{ color: "#96514d", size: "20px" }}>
                <FiSettings />
              </IconContext.Provider>
            </IconWrapper>
          </DropdownHeader>
          {open && (
            <DropdownListWrapper>
              <DropdownList>
                <ListItem>
                  <ListContent>文章の方向</ListContent>
                  <ListContent>
                    <SwtichWrapper>
                      <WritingModeWrapper>
                        <SwitchCheckbox
                          type="checkbox"
                          id="switch-checkbox"
                          onClick={handleClickModeChange}
                        />
                        <SwitchLabel htmlFor="">
                          <ModeSpan>ヨコ</ModeSpan>
                        </SwitchLabel>
                      </WritingModeWrapper>
                    </SwtichWrapper>
                  </ListContent>
                </ListItem>
              </DropdownList>
            </DropdownListWrapper>
          )}
        </DropdownWrapper>
      </SettingWrapper>
    </>
  );
}

export default SettingDiv