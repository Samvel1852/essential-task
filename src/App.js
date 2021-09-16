import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import { getLocalStorage } from "./helpers/localStorage";
import { storage } from "./constants/storage";

import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { Routes } from "./constants/routes";

function App() {
  const [todoMenu, setTodoMenu] = useState(
    getLocalStorage("todo") ? getLocalStorage("todo") : []
  );
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
  return (
    <>
      <Router>
        <Switch>
          <Route
            path={Routes.homePage.url}
            children={
              <HomePage
                setTodoMenu={setTodoMenu}
                todoMenu={todoMenu}
                setLoggedUser={setLoggedUser}
                loggedUser={loggedUser}
              />
            }
          />

          <Route
            exact
            path={Routes.loginPage.url}
            children={
              <LoginPage
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            }
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
