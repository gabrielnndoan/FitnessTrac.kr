import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken, logout } from "../auth";

const Logout = ({ authenticate, setAuthentication }) => {
  const [ logoutSuccessful, setLogoutSuccessful ] = useState(false);
 
  useEffect(() => {
    if (getToken() ) {
      logout();
      setLogoutSuccessful(true);
      setAuthentication(false);
    }
  }, []);

  if (logoutSuccessful && !authenticate) {
    return (<Route exact path="/logout">
    <Redirect to="/" />
  </Route>)
  }
  return null;
};
export default Logout;