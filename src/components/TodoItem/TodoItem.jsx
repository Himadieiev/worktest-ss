import React from "react";

import css from "./TodoItem.module.css";

const TodoItem = ({ todo }) => {
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
        <button type="button" className={css.delete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
