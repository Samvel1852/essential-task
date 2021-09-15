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

import { storage } from "./constants/storage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const [loggedUser, setLoggedUser] = useState(
    getLocalStorage("currentUser")
      ? {
          name: getLocalStorage("currentUser").name,
          surname: getLocalStorage("currentUser").surname,
          userName: getLocalStorage("currentUser").userName,
          password: getLocalStorage("currentUser").password,
          isLogged: true,
        }
      : {
          userName: "",
          isLogged: false,
        }
  );

  const isAuth = getLocalStorage(storage.isAuth);

  return (
    <>
      {/* <UserIsLoggedContext.Provider value={"I am a context"}> */}
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
              <LoginPage
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
                isAuth={isAuth}
              />
            }
          />
        </Switch>
      </Router>
      {/* </UserIsLoggedContext.Provider> */}
    </>
  );
}

export default App;
