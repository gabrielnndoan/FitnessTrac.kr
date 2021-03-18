import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
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
    return <Redirect to="/" />;
  }
  return null;
};
export default Logout;