import React, { useState } from "react";

import css from "./TodoItem.module.css";

const TodoItem = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li className={css.todo}>
      <div>
        <h2 className={css.title}>{todo.title}</h2>
        <p className={css.text}>{todo.text}</p>
        <div className={css.btns}>
          <button type="button" className={css.edit}>
            Edit
          </button>
          <button type="button" className={css.delete}>
            Delete
          </button>
        </div>
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </li>
  );
};

export default TodoItem;
