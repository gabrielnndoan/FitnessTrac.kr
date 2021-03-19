import { React, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { getToken, login } from "../auth";

const Login = ({
  authenticate,
  setAuthentication,
  username,
  setUsername,
  setToken,
}) => {
  const [password, setPassword] = useState();
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  function authentication(event) {
    event.preventDefault();
    fetch("https://nameless-cove-00092.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          alert("Username or Password does not match. Please try again.");
        } else {
          console.log(result);
          login(result.token);
          setToken(getToken());
          isLoggedIn(result);
        }
      })
      .catch(console.error);
  }

  const isLoggedIn = (result) => {
    if (!result.error) {
      console.log("is logged in");
      setAuthentication(true);
      setLoginSuccessful(true);
      alert(result.message);
    } else {
      console.log("not logged in");
      alert(result.message);
    }
  };

  if (loginSuccessful && authenticate) {
    return <Redirect to="/myRoutines" />;
  }

  return (
    <div >
      <h1> Login Page </h1>
      <form  onSubmit={authentication}>
        <label>Username:</label>
        <input
          // minLength="8"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>

        <label>Password:</label>
        <input
          type="password"
          minLength="8"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <div>
          <button  type="submit">
            Login
          </button>
          <Link  to="/register">
            Click to Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
