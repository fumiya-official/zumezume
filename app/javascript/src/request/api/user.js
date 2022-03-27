import AxiosWrapper from "../AxiosWrapper"

/**
 * nameに一致するユーザ情報を取得
 * @param {string} name - 検索するユーザid
 * @returns {Object}
 */
export const getUsers = (name) => {
  return AxiosWrapper.get("/user/users",
    {
      params: {
        name: name
      }
    }
  )
}

/**
 * ユーザ情報の更新
 * @param {number} id 
 * @param {string} nickname 
 * @param {string} name 
 * @param {string} biography 
 * @returns {Object}
 */
export const editUser = (id, nickname, name, biography) => {
  const params = {
    nickname: nickname,
    name: name,
    biography: biography
  }

  return AxiosWrapper.patch(`/user/users/${id}`, 
    { user: params },
    { withCredentials: true }
  )
}