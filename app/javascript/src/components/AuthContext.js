import React, { createContext, useReducer, useEffect, useState } from 'react'
import AxiosWrapper from '../request/AxiosWrapper'
import Cookies from 'js-cookie'

const StateAuthContext = createContext()
const DispatchAuthContext = createContext()

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      console.log('success')
      return {
        auth: true,
        id: action.id,
        name: action.name
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

const handleGetCurrentUser = async (dispatch) => {
  try {
    const resp = await getCurrentUser()
    if (resp.data.logged_in) {
      dispatch({
        type: "SUCCESS",
        id: resp.data.data.name,
        name: resp.data.data.nickname
      });
    }
    else {
      dispatch({
        type: "FAILED",
        id: null,
        name: null
      })
    }
  }
  catch (err) {
    dispatch({
      type: "FAILED",
      id: null,
      name: null
    })
  }
}

const AuthProvider = ({ children }) => {
  const initial_state = {
    auth: false,
    id: null,
    name: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initial_state)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    handleGetCurrentUser(dispatch)
    setLoading(false)
  }, [state.id])
  
  return (
    <StateAuthContext.Provider value={{ state }}>
      <DispatchAuthContext.Provider value={{ dispatch }}>
        {!loading && children}
      </DispatchAuthContext.Provider>
    </StateAuthContext.Provider>
  )
}

export { StateAuthContext, DispatchAuthContext, AuthProvider }