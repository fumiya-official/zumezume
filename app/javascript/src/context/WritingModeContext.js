import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useWindowSize } from 'react-use'

const WritingModeContext = createContext()

const WritingModeProvider = ({children}) => {
  const [writing_mode, setWritingMode] = useState("HORIZONTAL")
  const { width } = useWindowSize()

  useEffect(() => {
    getCurrentMode()
  }, [writing_mode])

  useEffect(() => {
    if (writing_mode === "VERTICAL" && width < 900) setWritingMode("HORIZONTAL") 
  }, [width])

  const getCurrentMode = () => {
    if (!Cookies.get("_writing_mode") || Cookies.get("_writing_mode") === "HORIZONTAL") {
      setWritingMode("HORIZONTAL")
    } else if (Cookies.get("_writing_mode") === "VERTICAL") {
      if (width < 900) {
        Cookies.set("_writing_mode", "HORIZONTAL")
        setWritingMode("HORIZONTAL")
      } else {
        setWritingMode("VERTICAL")
      }
      
    }
  }

  const handleClickModeChange = (event) => {
    let used_browser = window.navigator.userAgent.toLowerCase();

    if (writing_mode === "HORIZONTAL") {
      if (used_browser.indexOf("chrome") === -1) {
        alert("縦書きモードはChromeを使ってください");
        event.preventDefault();
        return;
      } else if (width < 900) {
        alert("画面サイズを大きくしてください");
        event.preventDefault();
        return;
      }
      Cookies.set("_writing_mode", "VERTICAL");

      setWritingMode("VERTICAL");
    } else {
      Cookies.set("_writing_mode", "HORIZONTAL");
      setWritingMode("HORIZONTAL");
    }
  };

  const value =  {
    writing_mode,
    handleClickModeChange,
    width
  }

  return (
    <WritingModeContext.Provider value={value}>
      {children}
    </WritingModeContext.Provider>
  )
}

export { WritingModeContext, WritingModeProvider }