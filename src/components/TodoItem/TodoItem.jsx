import React from "react";
import { useDispatch } from "react-redux";

import css from "./TodoItem.module.css";
import { deleteTodo } from "../../redux/thunk";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleDeleteBtn = async () => {
    try {
      await dispatch(deleteTodo(todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <li className={css.todo}>
      <h2 className={css.title}>{todo.title}</h2>
      <p className={css.text}>{todo.text}</p>
      <p className={css.priority}>
        Priority: <span className={css.priorityColor}>{todo.priority}</span>
      </p>
      <div className={css.btns}>
        <button type="button" className={css.edit}>
          Edit
        </button>
        <button type="button" className={css.delete} onClick={handleDeleteBtn}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
