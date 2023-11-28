import React from "react";

import css from "./TodoForm.module.css";

const TodoForm = () => {
  return (
    <form className={css.form}>
      <h2 className={css.title}>Create To Do</h2>
      <label className={css.label}>
        Title
        <br />
        <input className={css.input} type="text" />
      </label>
      <label className={css.label}>
        Text
        <br />
        <textarea className={css.textarea} />
      </label>
      <div className={css.radioInputs}>
        <label className={css.radioLabel}>
          <span>Low</span>
          <input type="radio" name="priority" />
        </label>
        <label className={css.radioLabel}>
          <span>Medium</span>
          <input type="radio" name="priority" />
        </label>
        <label className={css.radioLabel}>
          <span>High</span>
          <input type="radio" name="priority" />
        </label>
      </div>
      <button className={css.btn} type="submit">
        Create
      </button>
    </form>
  );
};

export default TodoForm;
