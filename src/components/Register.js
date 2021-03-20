import { useState, React } from "react";
import { Redirect } from "react-router-dom";
import { login, getToken } from "../auth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Register = ({
  username,
  setUsername,
  token,
  setToken,
  authenticate,
  setAuthentication,
}) => {
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPassWordConfirmation] = useState();

  function createUser(event) {
    event.preventDefault();
    if (username && password && password === passwordConfirmation) {
      fetch("https://nameless-cove-00092.herokuapp.com/api/users/register", {
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
          if (result.error) {
            alert(result.error);
          }
          if (result.token !== undefined) {
            login(result.token);
            setToken(getToken());
            isLoggedIn(result);
          }
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
    <div>
      <Container>
        <center>
          <h1 style={{ padding: "35px" }}>REGISTER PAGE</h1>
        </center>
        <Form onSubmit={createUser}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              minLength="8"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Form.Text id="passwordHelpInline" muted>
              Must be greater than 7 characters.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              placeholder="Password Confirmation"
              minLength="8"
              onChange={(event) => {
                setPassWordConfirmation(event.target.value);
              }}
            />
            <Form.Text id="passwordHelpInline" muted>
              Must be greater than 7 characters.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
