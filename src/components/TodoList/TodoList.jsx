import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import css from "./TodoList.module.css";
import { getTodos } from "../../redux/thunk";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodosData = async () => {
      try {
        const fetchedTodos = await dispatch(getTodos());
        setTodos(fetchedTodos.payload);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodosData();
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
