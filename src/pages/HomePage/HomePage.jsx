import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import List from "../../components/List/List";
import { Routes } from "../../constants/routes";
import {
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from "../../helpers/localStorage";
import styles from "./HomePage.module.css";

export default function Todo({
  setLoggedUser,
  loggedUser,
  setTodoMenu,
  todoMenu,
}) {
  const [errorPlaceholder, setErrorPlaceholder] = useState({
    error: "Please fill the field",
    visible: false,
  });
  const [todoList, setTodoList] = useState();
  const [list, setList] = useState(
    getLocalStorage(`${loggedUser.userName}Todo`)
      ? getLocalStorage(`${loggedUser.userName}Todo`)
      : []
  );
  //   const [count, setCount] = useState(0);
  const [listInputValue, setListInputValue] = useState("");

  useEffect(() => {
    if (getLocalStorage("currentUser")) {
      setLoggedUser({
        ...getLocalStorage("currentUser"),
        isLogged: true,
      });
    }
  }, []);

  const onHandleChange = (el) => {
    setTodoList(el.target.value);
    setErrorPlaceholder({ ...errorPlaceholder, visible: false });
  };

  const onHandleClick = (e) => {
    // setCount(count + 1);
    if (todoList) {
      setList([
        {
          name: todoList,
          id: Date.now(),
          readOnly: true,
          edited: false,
          isActive: true,
        },
        ...list,
      ]);
    } else {
      setErrorPlaceholder({ ...errorPlaceholder, visible: true });
    }
    setTodoList("");
    console.log("list", list);
  };

  useEffect(() => {
    setLocalStorage(`${loggedUser.userName}Todo`, list);
    setTodoMenu(list);
  }, [list]);

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
      todoMenu.map((todo) =>
        todo.id === todoList.id && todo.edited === false
          ? { ...todo, readOnly: false, edited: true }
          : { ...todo, readOnly: true, edited: false }
      )
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
    removeFromLocalStorage("currentUser");
  };
  console.log("loggedUser", loggedUser);

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
          value={todoList}
          placeholder={!errorPlaceholder.visible ? "" : errorPlaceholder.error}
        />
        <Button
          style={{ padding: "12px", width: "80px" }}
          handleClick={(e) => onHandleClick(e)}
          text="Add"
        />
      </div>
      <div className={styles.todoNavigation}>
        <Button
          handleClick={() => showAllInputs()}
          text={`All:  ${list.length}`}
        />
        <Button
          handleClick={() => showActiveInputs()}
          text={`Active: ${
            list.filter((todo) => todo.isActive === true).length
          } `}
          style={{ backgroundColor: "#a99a86" }}
        />
        <Button
          handleClick={() => showCompletedInputs()}
          text={`Completed: ${
            list.filter((todo) => todo.isActive === false).length
          } `}
          style={{ backgroundColor: "#c3b091" }}
        />
      </div>
      <div className={styles.list}>
        {
          (console.log("todoMenu", todoMenu),
          todoMenu.length
            ? todoMenu.map((el, i) => (
                <div className={styles.listRow} key={i}>
                  <List
                    onChange={(evt) => changeListInput(evt, el)}
                    onEdit={() => onEditInput(el)}
                    onDelate={() => delateInput(el.id)}
                    onActiveToggle={() => onActiveToggle(el)}
                    edit={el.edited ? "Save" : "Edit"}
                    delate="Delate"
                    save="Save"
                    done={el.isActive ? "Done" : "Undone"}
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
            : null)
        }
      </div>
    </div>
  ) : (
    <Redirect to={Routes.loginPage.url} />
  );
}
