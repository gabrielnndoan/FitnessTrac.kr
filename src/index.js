import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState();
  const [token, setToken] = useState();
  const [authenticate, setAuthentication] = useState(false);
  return (
    <Router>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/routines">ROUTINES</Link>
        <Link to="/myRoutines">MY ROUTINES</Link>
        <Link to="/activities">ACTIVITIES</Link>
        {!authenticate ? (
              
                <Link to="/Login">LOGIN</Link>
      
            ) : null}
        <Link to="/register">REGISTER</Link>
      </nav>
      <main>
        <Switch>
          <Route path="/routines"></Route>
          <Route path="/myRoutines"></Route>
          <Route path="/activities"></Route>
          <Route path="/login">
          {!authenticate ? (<Login
              username={username}
              setUsername={setUsername}
              setToken={setToken}
              authenticate={authenticate}
              setAuthentication={setAuthentication}
            />) : null }
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
          <Route path="/"></Route>
        </Switch>
      </main>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
