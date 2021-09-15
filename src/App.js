import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { getLocalStorage } from "./helpers/localStorage";
import { UserIsLoggedContext } from "./helpers/userContext";

import { storage } from "./constants/storage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const [loggedUser, setLoggedUser] = useState({
    userName: "",
    isLogged: false,
  });

  const isAuth = getLocalStorage(storage.isAuth);

  return (
    <>
      <UserIsLoggedContext.Provider value={"I am a context"}>
        <Router>
          <Switch>
            <Route
              path="/home"
              children={
                <HomePage
                  setLoggedUser={setLoggedUser}
                  loggedUser={loggedUser}
                  isAuth={"isAuth"}
                />
              }
            />

            <Route
              exact
              path="/"
              children={
                <LoginPage setLoggedUser={setLoggedUser} isAuth={isAuth} />
              }
            />
          </Switch>
        </Router>
      </UserIsLoggedContext.Provider>
    </>
  );
}

export default App;
