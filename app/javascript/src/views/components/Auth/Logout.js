import React, { useContext } from "react"
import Cookies from "js-cookie";
import { signout } from "../../../request/api/auth"
import { DispatchAuthContext } from "../../../context/AuthContext"
import { Button } from "../../../styles/NavBar/NavBarStyle";

function Logout() {
  const { dispatch } = useContext(DispatchAuthContext);

  const handleLogout = async (event) => {
    event.preventDefault();
    try{
      const resp = await signout()
      if (resp) {
        dispatch({
          type: 400
        })
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        location.href = "http://localhost:3000/login";
      }
    }
    catch(err) {
      console.log(err)
    }
  };

  
  return (
    <Button onClick={handleLogout}>ログアウト</Button>
  )
}

export default Logout