import React, { useContext } from "react";
import { StateAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

/**
 * @component
 * @example
 * return (
 *  <Route path="/" element={
 *    <RouteAuthGuard component={<Home />} redirect="/login" />
 *  } />
 * )
 */
export const RouteAuthGuard = (props) => {
  const { state } = useContext(StateAuthContext)
  let allow_route = false

  if ( state.auth ) {
    allow_route = true
  }

  if (!allow_route) {
    return <Navigate to={props.redirect} />
  }

  return <>{props.component}</>
}