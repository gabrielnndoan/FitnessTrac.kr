import { useState, React } from "react";
import { Redirect } from "react-router-dom";
import { login, getToken } from "../auth";

const Register = ({ username, setUsername, token, setToken, authenticate, setAuthentication }) => {
  const [password, setPassWord] = useState();
  const [passwordConfirmation, setPassWordConfirmation] = useState();

  function createUser(event) {
    event.preventDefault();
    if (username && password && password === passwordConfirmation) {
      fetch("http://fitnesstrac-kr.herokuapp.com/api/users/register", {
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
          console.log(result);
          if (!result.success) {
            alert(result.message);
          }
          login(result.token);
          setToken(getToken());
          isLoggedIn(result);
        })
        .catch(console.error);
    }
  }

  const isLoggedIn = (result) => {
    if (result.token) {
      console.log("is registered");
      setAuthentication(true);
      alert(result.message);
    } else {
      console.log("not registered");
    }
  };

  if (authenticate && token) {
    return <Redirect to="./myRoutines" />;
  }

  return (
    <div className="registerInput">
      <h1> Register Page </h1>
      <p className="rules"> Username & Password must be 8 characters! </p>
      <form className="form" onSubmit={createUser}>
        <label className="userLabel">Username:</label>
        <input
          className="userInput"
          minLength="8"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <label className="passwordLabel">Password:</label>
        <input
          className="passwordInput"
          minLength="8"
          onChange={(event) => {
            setPassWord(event.target.value);
          }}
        ></input>

        <label className="confirmLabel">Password Confirmation:</label>
        <input
          className="confirmInput"
          minLength="8"
          onChange={(event) => {
            setPassWordConfirmation(event.target.value);
          }}
        ></input>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
