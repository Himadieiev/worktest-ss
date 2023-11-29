import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import css from "./TodoList.module.css";
import { getTodos } from "../../redux/thunk";
import TodoItem from "../TodoItem/TodoItem";
import { selectTodos } from "../../redux/selectors";
import Modal from "../Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);

  const toggleModal = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <main className="container">
      <ul className={css.list}>
        {todos
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleModal={toggleModal} />
          ))
          .reverse()}
      </ul>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <TodoForm toggleModal={toggleModal} editTodo={editTodo} />
        </Modal>
      )}
    </main>
  );
};

export default TodoList;
