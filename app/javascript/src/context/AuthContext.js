import React, { createContext, useReducer, useEffect, useState } from 'react'
import AxiosWrapper from '../request/AxiosWrapper'
import Cookies from 'js-cookie'

const StateAuthContext = createContext()
const DispatchAuthContext = createContext()

/**
 * 
 * @param {Object} state 
 * @param {Object} action
 *  @property {number} type - 200: 成功, 400: 失敗
 *  @property {number} id - ユーザid
 *  @property {string} name - ユーザ名
 *  @property {string} nickname - 表示名
 * @returns {Object}
 */
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 200:
      console.log('success')
      return {
        auth: true,
        id: action.id,
        name: action.name,
        nickname: action.nickname
      }
    case 400:
      console.log('failed')
      return {
        auth: false,
        id: null,
        name: "",
        nickname: ""
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
    console.log(resp)
    if (resp.data.logged_in) {
      dispatch({
        type: 200,
        id: resp.data.data.id,
        name: resp.data.data.name,
        nickname: resp.data.data.nickname
      });
    }
    else {
      dispatch({
        type: 400
      })
    }
  }
  catch (err) {
    dispatch({
      type: 400
    })
  }
}

const AuthProvider = ({ children }) => {
  /**
   * @param {Object} initial_state - 初期値
   *  @property {number} type - 200: 成功, 400: 失敗
   *  @property {number} id - ユーザid
   *  @property {string} name - ユーザ名
   *  @property {string} nickname - 表示名
   */
  const initial_state = {
    auth: false,
    id: null,
    name: null,
    nickname: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    handleGetCurrentUser(dispatch);
  }, []);

  return (
    <StateAuthContext.Provider value={{ state }}>
      <DispatchAuthContext.Provider value={{ dispatch }}>
        {children}
      </DispatchAuthContext.Provider>
    </StateAuthContext.Provider>
  );
}

export { StateAuthContext, DispatchAuthContext, AuthProvider }