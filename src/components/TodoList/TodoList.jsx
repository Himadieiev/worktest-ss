import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import css from "./TodoList.module.css";
import { getTodos } from "../../redux/thunk";
import TodoItem from "../TodoItem/TodoItem";
import { selectTodos } from "../../redux/selectors";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <main className="container">
      <ul className={css.list}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
};

export default TodoList;
