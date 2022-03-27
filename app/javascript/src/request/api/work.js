import AxiosWrapper from "../AxiosWrapper";

/**
 * idと一致する作品を取得
 * @param {number} id 
 * @returns 
 */
export const getWork = (id) => {
  return AxiosWrapper.get(`/work/works/${id}`)
}

/**
 * name(作者)の作品を取得: nullの場合は全作品を取得
 * @param {string} name - 作者名
 * @returns 
 */
export const getWorks = (name) => {
  return AxiosWrapper.get(
    "/work/works",
    { params: { name: name } }
    );
}

/**
 * 作品を投稿
 * @param {Object} data - title, content
 * @returns 
 */
export const postWork = (data) => {
  return AxiosWrapper.post(
    "/work/works",
    { work: data },
    { withCredentials: true }
  );
}

/**
 * idの作品を編集
 * @param {Object} data 
 * @param {number} id 
 * @returns 
 */
export const editWork = (data, id) => {
  return AxiosWrapper.patch(
    `/work/works/${id}`,
    { work: data },
    { withCredentials: true }
  );
}