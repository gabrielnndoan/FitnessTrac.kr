import { React, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  Register,
  Login,
  Logout,
  Routines,
  MyRoutines,
  Activities,
  Home,
} from "./components";
import { getToken } from "./auth";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const App = () => {
  const [username, setUsername] = useState();
  const [token, setToken] = useState();
  const [authenticate, setAuthentication] = useState(false);

  useEffect(() => {
    if (getToken() && getToken() !== undefined) {
      setAuthentication(true);
    }
  }, []);
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">FitnessTrackr</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/routines">Routines</Nav.Link>
          {!authenticate && !getToken() ? null : (
            <Nav.Link href="/myRoutines">My Routines</Nav.Link>
          )}
          <Nav.Link href="/activities">Activities</Nav.Link>
          {!authenticate && !getToken() ? (
            <Nav.Link href="/login">Login/Register</Nav.Link>
          ) : (
            <Link
              style={{ color: "rgba(255,255,255,.5)", padding: "7.5px" }}
              to="/logout"
            >
              Logout
            </Link>
          )}
        </Nav>
      </Navbar>

      <main>
        <Switch>
          <Route path="/routines">
            <Routines />
          </Route>
          <Route path="/myRoutines">
            <MyRoutines />
          </Route>
          <Route path="/activities">
            <Activities authenticate={authenticate} />
          </Route>
          <Route path="/login">
            <Login
              username={username}
              setUsername={setUsername}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
            />
          </Route>
          <Route path="/logout">
            <Logout
              authenticate={authenticate}
              setAuthentication={setAuthentication}
            />
          </Route>
          <Route path="/register">
            <Register
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
            />
          </Route>
          <Route path="/">
            <Home authenticate={authenticate} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
