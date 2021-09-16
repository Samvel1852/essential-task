import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import styles from "./HomePage.module.css";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import ListItem from "../../components/ListItem/ListItem";

import { Routes } from "../../constants/routes";
import { storage } from "../../constants/storage";
import { buttonTypes, filterTypes } from "../../constants/utils";
import {
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from "../../helpers/localStorage";

export default function Todo({
  setLoggedUser,
  loggedUser,
  setTodoMenu,
  todoMenu,
}) {
  const [isPlaceholderError, setIsPlaceholderError] = useState(false);
  const [todoList, setTodoList] = useState();
  const [list, setList] = useState(
    getLocalStorage(`${loggedUser.userName}Todo`)
      ? getLocalStorage(`${loggedUser.userName}Todo`)
      : []
  );

  useEffect(() => {
    if (getLocalStorage(storage.currentUser)) {
      setLoggedUser({
        ...getLocalStorage(storage.currentUser),
        isLogged: true,
      });
    }
  }, []);

  useEffect(() => {
    setLocalStorage(`${loggedUser.userName}Todo`, list);
    setTodoMenu(list);
  }, [list]);

  const onHandleChange = (el) => {
    setTodoList(el.target.value);
    setIsPlaceholderError(false);
  };

  const onHandleAdd = () => {
    if (todoList) {
      setList([
        {
          name: todoList,
          id: Date.now(),
          readOnly: true,
          editable: false,
          isActive: true,
        },
        ...list,
      ]);
    } else {
      setIsPlaceholderError({ ...isPlaceholderError, visible: true });
    }
    setTodoList("");
  };

  const delateInput = (id) => {
    setList(list.filter((el) => id !== el.id));
  };

  const changeListInput = (evt, todoList) => {
    setList(
      list.map((todo) =>
        todo.id === todoList.id ? { ...todo, name: evt.target.value } : todo
      )
    );
  };

  const onEditInput = (todoList) => {
    setList(
      todoMenu.map((todo) => {
        if (todo.id === todoList.id && todo.editable === false) {
          return { ...todo, readOnly: false, editable: true };
        } else {
          return { ...todo, readOnly: true, editable: false };
        }
      })
    );

    console.log(todoMenu);
  };

  const onActiveToggle = (todoList) => {
    setList(
      list.map((todo) =>
        todo.id === todoList.id ? { ...todo, isActive: !todo.isActive } : todo
      )
    );
  };

  const showAllInputs = () => {
    setTodoMenu(list.map((todo) => todo));
  };

  const showActiveInputs = () => {
    setTodoMenu(list.filter((todo) => todo.isActive === true));
  };

  const showCompletedInputs = () => {
    setTodoMenu(list.filter((todo) => todo.isActive === false));
  };

  const handleLogout = () => {
    setLoggedUser({ userName: "", isLogged: false });
    removeFromLocalStorage(storage.currentUser);
  };

  return loggedUser.isLogged ? (
    <div
      style={{
        border: "1px solid black",
        width: "600px",
        margin: "auto",
        paddingBottom: "30px",
        backgroundColor: "#856d4d",
      }}
    >
      <div className={styles.logoutContainer}>
        <Button handleClick={() => handleLogout()} text="log out" />
      </div>
      <h2 className={styles.user}>
        {loggedUser.name} {loggedUser.surname}
      </h2>
      <h1 className={styles.title}>Todo List</h1>

      <div className={styles.todo}>
        <Input
          style={{ backgroundColor: "#BDB76B" }}
          onChange={(el) => onHandleChange(el)}
          value={todoList || ""}
          placeholder={
            isPlaceholderError ? "Please fill the field" : "Enter your task"
          }
          isError={isPlaceholderError}
        />
        <Button
          style={{ padding: "12px", width: "80px" }}
          handleClick={(e) => onHandleAdd(e)}
          text={buttonTypes.add}
        />
      </div>
      <div className={styles.todoNavigation}>
        <Button
          handleClick={() => showAllInputs()}
          text={`${filterTypes.all}:  ${list.length}`}
        />
        <Button
          handleClick={() => showActiveInputs()}
          text={`${filterTypes.active}: ${
            list.filter((todo) => todo.isActive === true).length
          } `}
          style={{ backgroundColor: "#a99a86" }}
        />
        <Button
          handleClick={() => showCompletedInputs()}
          text={`${filterTypes.completed}: ${
            list.filter((todo) => todo.isActive === false).length
          } `}
          style={{ backgroundColor: "#c3b091" }}
        />
      </div>
      <div className={styles.list}>
        {todoMenu.length
          ? todoMenu.map((el, i) => (
              <div className={styles.listRow} key={i}>
                <ListItem
                  onChange={(evt) => changeListInput(evt, el)}
                  onEdit={() => onEditInput(el)}
                  onDelate={() => delateInput(el.id)}
                  onActiveToggle={() => onActiveToggle(el)}
                  edit={el.editable ? buttonTypes.save : buttonTypes.edit}
                  delate={buttonTypes.delete}
                  save={buttonTypes.save}
                  done={el.isActive ? buttonTypes.done : buttonTypes.undone}
                  value={el.name}
                  readOnly={el.readOnly}
                  className={styles.inputs}
                  style={
                    el.isActive === false
                      ? {
                          backgroundColor: "#c3b091",
                          textDecoration: "line-through",
                        }
                      : { backgroundColor: "#a99a86" }
                  }
                />
              </div>
            ))
          : null}
      </div>
    </div>
  ) : (
    <Redirect to={Routes.loginPage.url} />
  );
}

Todo.propTypes = {
  setLoggedUser: PropTypes.func.isRequired,
  setTodoMenu: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired,
  todoMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
};
