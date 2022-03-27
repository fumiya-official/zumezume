import AxiosWrapper from "../AxiosWrapper";
import Cookies from "js-cookie";

/**
 * 会員登録
 * @param {Object} params - id, email, パスワード
 * @returns {Object}
 */
export const signup = (params) => {
  return AxiosWrapper.post("/auth",
    params,
    { withCredentials: true }
  )
}

/**
 * ログイン
 * @param {Object} params - email, パスワード
 * @returns {Object}
 */
export const signin = (params) => {
  return AxiosWrapper.post("/auth/sign_in",
    params,
    { withCredentials: true }
  )
}

/**
 * idもしくはemailがユニークかどうか判定
 * @param {string} column_name 
 * @param {string} value 
 * @returns {Object} - true: ユニーク false: 非ユニーク
 */
export const checkUniqueness = (column_name, value) => {
  const check_data = {
    name: column_name,
    value: value
  }

  return AxiosWrapper.post("/auth/check",
    { check_data },
    { withCredentials: true }
  )
}

/**
 * ログアウト
 * @returns {Object}
 */
export const signout = () => {
  return AxiosWrapper.delete("/auth/sign_out",
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    }
  )
}

/**
 * 現在のログインユーザを取得
 * @returns {Object}
 */
export const currentUser = () => {
  return AxiosWrapper.get("/auth/sessions",
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }
    }
  )
}