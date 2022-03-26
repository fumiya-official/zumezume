import AxiosWrapper from "../AxiosWrapper";

export const getWork = (id) => {
  return AxiosWrapper.get(`/work/works/${id}`)
}

export const getWorks = (name) => {
  return AxiosWrapper.get(
    "/work/works",
    { params: { name: name } }
    );
}

export const postWork = (data) => {
  return AxiosWrapper.post(
    "/work/works",
    { work: data },
    { withCredentials: true }
  );
}

export const editWork = (data, id) => {
  return AxiosWrapper.patch(
    `/work/work/${id}`,
    { work: data },
    { withCredentials: true }
  );
}