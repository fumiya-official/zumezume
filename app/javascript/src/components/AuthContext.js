import React, { createContext, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosWrapper from '../request/AxiosWrapper'
import Cookies from 'js-cookie'

const StateAuthContext = createContext()
const DispatchAuthContext = createContext()

const AuthProvider = ({ children }) => {
  
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case "SUCCESS":
        console.log(state)
        console.log(action)
        console.log('success')
        return {
          auth: true,
          name: action.name,
        }
      case "FAILED":
        console.log('failed')
        return {
          auth: false,
          name: null,
        }
      default:
        throw new Error(`Unhandled action type: ${action.type}`)
    }
  }

  const getCurrentUser = () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) {
      console.log('ログインしていません')
      return
    }
    console.log('ログイン中')

    return (
      AxiosWrapper.get(
        "/auth/sessions",
        {
          headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
          }
        },
        { withCredentials: true }
      )
    )
  }

  const navigate = useNavigate()
  const handleGetCurrentUser = async () => {
    try {
      const resp = await getCurrentUser()
      if (resp.data.logged_in) {
        dispatch({
          type: "SUCCESS",
          name: resp.data.data.name
        })
        // navigate("/")
      }
      else {
        dispatch({
          type: "FAILED",
          name: null
        })
      }
    }
    catch (err) {
      dispatch({
        type: "FAILED",
        name: null
      })
    }
  }

  const initial_state = {
    auth: false,
    name: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initial_state)
  
  useEffect(() => {
    handleGetCurrentUser()
  }, [state.name])
  
  return (
    <StateAuthContext.Provider value={{ state }}>
      <DispatchAuthContext.Provider value={{ dispatch }}>
        {children}
      </DispatchAuthContext.Provider>
    </StateAuthContext.Provider>
  )
}

export { StateAuthContext, DispatchAuthContext, AuthProvider }