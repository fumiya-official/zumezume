import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const WritingModeContext = createContext()

const WritingModeProvider = ({children}) => {
  const [writing_mode, setWritingMode] = useState("HORIZONTAL")
  const value =  {
    writing_mode,
    setWritingMode
  }

  const getCurrentMode = () => {
    if (!Cookies.get("_writing_mode") || Cookies.get("_writing_mode") === "HORIZONTAL") {
      setWritingMode("HORIZONTAL")
    } else if (Cookies.get("_writing_mode") === "VERTICAL") {
      let display_width = document.documentElement.clientWidth;

      if (display_width < 900) {
        Cookies.set("_writing_mode", "HORIZONTAL")
        setWritingMode("HORIZONTAL")
      } else {
        setWritingMode("VERTICAL")
      }
      
    }
  }

  useEffect(() => {
    getCurrentMode()
  }, [writing_mode])

  return (
    <WritingModeContext.Provider value={value}>
      {children}
    </WritingModeContext.Provider>
  )
}

export { WritingModeContext, WritingModeProvider }