import { React, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { getToken, login } from "../auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


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
    <Container>
    <Form onSubmit={authentication}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="username" placeholder="Enter username" onChange={(event) => {
            setUsername(event.target.value);
          }} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={(event) => {
            setPassword(event.target.value);
          }} />
  </Form.Group>
 
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <Link  to="/register">
            Click to Register
          </Link>
</Form>
</Container>
  );
};

export default Login;
