import React, { useState, useContext, useEffect } from 'react'
import { WritingModeContext } from "../../../../context/WritingModeContext";
import { IconContext } from "react-icons";
import { FiSettings } from "react-icons/fi";
import {
  SettingWrapper,
  DropdownWrapper,
  DropdownHeader,
  IconWrapper,
  DropdownListWrapper,
  DropdownList,
  ListItem,
  ListContent,
  SwtichWrapper,
  WritingModeWrapper,
  SwitchCheckbox,
  SwitchLabel,
  ModeSpan,
  ListLabel
} from '../../../../styles/NavBar/Division/DivisionStyle';


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
                  <ListLabel>文章の方向</ListLabel>
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