import React, { useContext } from "react"
import Cookies from "js-cookie";
import AxiosWrapper from "../../../request/AxiosWrapper";
import { DispatchAuthContext } from "../../../context/AuthContext"
import { Button } from "../../../styles/NavBar/NavBarStyle";

function Logout() {
  const { dispatch } = useContext(DispatchAuthContext);

  const handleLogout = (event) => {
    event.preventDefault();

    AxiosWrapper.delete(
      "/auth/sign_out",
      {
        headers: {
          "access-token": Cookies.get("_access_token"),
          client: Cookies.get("_client"),
          uid: Cookies.get("_uid"),
        },
      },
      { withCredentials: true }
    )
      .then((resp) => {
        dispatch({
          type: 400,
        });
        AxiosWrapper.defaults.headers.common["X-CSRF-Token"] =
          resp.headers["x-csrf-token"];
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        location.href = "http://localhost:3000/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <Button onClick={handleLogout}>ログアウト</Button>
  )
}

export default Logout