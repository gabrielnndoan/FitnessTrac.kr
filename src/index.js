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
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/routines">ROUTINES</Link>
        {!authenticate && !getToken() ? null : (
          <Link to="/myRoutines">MY ROUTINES</Link>
        )}
        <Link to="/activities">ACTIVITIES</Link>
        {!authenticate && !getToken() ? (
          <Link to="/login">LOGIN</Link>
        ) : (
          <Link to="/logout">LOGOUT</Link>
        )}
      </nav>
      <main>
        <Switch>
          <Route path="/routines">
            <Routines
              username={username}
              setUsername={setUsername}
              authenticate={authenticate}
            />
          </Route>
          <Route path="/myRoutines">
            <MyRoutines username={username} setUsername={setUsername} />
          </Route>
          <Route path="/activities">
            <Activities />
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
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
