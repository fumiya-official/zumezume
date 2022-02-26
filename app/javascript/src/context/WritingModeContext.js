import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useWindowSize } from 'react-use'

const WritingModeContext = createContext()

const WritingModeProvider = ({children}) => {
  const [writing_mode, setWritingMode] = useState(1)
  const { width } = useWindowSize()

  useEffect(() => {
    getCurrentMode()
  }, [writing_mode])
  
  useEffect(() => {
    if (writing_mode === 0 && width < 900) setWritingMode(1) 
  }, [width])

  const getCurrentMode = () => {
    if (!Cookies.get("_writing_mode") || Cookies.get("_writing_mode") === 1) {
      setWritingMode(1)
    } else if (Cookies.get("_writing_mode") === 0) {
      if (width < 900) {
        Cookies.set("_writing_mode", 1)
        setWritingMode(1)
      } else {
        setWritingMode(0)
      }
      
    }
  }

  const handleClickModeChange = (event) => {
    let used_browser = window.navigator.userAgent.toLowerCase();

    if (writing_mode === 1) {
      if (used_browser.indexOf("chrome") === -1) {
        alert("縦書きモードはChromeを使ってください");
        event.preventDefault();
        return;
      } else if (width < 900) {
        alert("画面サイズを大きくしてください");
        event.preventDefault();
        return;
      }
      Cookies.set("_writing_mode", 0);

      setWritingMode(0);
    } else {
      Cookies.set("_writing_mode", 1);
      setWritingMode(1);
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