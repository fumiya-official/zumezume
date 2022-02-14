import React, { useContext } from "react";
import { StateAuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const RouteAuthGuard = (props) => {
  const { state } = useContext(StateAuthContext)
  let allow_route = false
  if ( state.auth ) {
    allow_route = props.allowroles ? props.allowroles.includes(authUser.role) : true;
  }

  if (!allow_route) {
    return <Navigate to={props.redirect} />
  }

  return <>{props.component}</>

}