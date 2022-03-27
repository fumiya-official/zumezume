import AxiosWrapper from "../AxiosWrapper"

/**
 * idと一致する作品に対する、コメントの取得
 * @param {number} id - work_id
 * @returns 
 */
export const getComments = (id) => {
  return AxiosWrapper.get("/work/comments",
    {
      params: {
        work_id: id
      }
    }
  )
}

/**
 * コメントを投稿
 * @param {Object} comment 
 * @returns 
 */
export const postComment = (comment) => {
  return AxiosWrapper.post("/work/comments",
    { comment: comment },
    { withCredentials: true }
  )
}

/**
 * コメント削除
 * @param {number} id 
 * @returns 
 */
export const deleteComment = (id) => {
  return AxiosWrapper.delete(`/work/comments/${id}`,
    { withCredentials: true }
  )
}

/**
 * コメント編集
 * @param {number} id 
 * @param {Object} comment 
 * @returns 
 */
export const editComment = (id, comment) => {
  return AxiosWrapper.patch(`/work/comments/${id}`,
    { comment: comment },
    { withCredentials: true }
  )
}