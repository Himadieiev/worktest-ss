import React, { useState } from "react";
import { useDispatch } from "react-redux";

import css from "./TodoForm.module.css";
import { addTodo } from "../../redux/thunk";

const TodoForm = ({ toggleModal }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addTodo({ title, text, priority }));
    } catch (error) {
      console.error("Error adding todo:", error);
    }

    setTitle("");
    setText("");
    setPriority("low");

    toggleModal();
  };

  return (
    <form className={css.form}>
      <h2 className={css.title}>Create To Do</h2>
      <label className={css.label}>
        Title
        <br />
        <input
          className={css.input}
          type="text"
          name="title"
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={css.label}>
        Text
        <br />
        <textarea
          className={css.textarea}
          name="text"
          placeholder="Enter text"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <div className={css.radioInputs}>
        <label className={css.radioLabel}>
          <span>Low</span>
          <input
            type="radio"
            name="priority"
            value="low"
            checked={priority === "low"}
            onChange={(e) => setPriority(e.target.value)}
          />
        </label>
        <label className={css.radioLabel}>
          <span>Medium</span>
          <input
            type="radio"
            name="priority"
            value="medium"
            checked={priority === "medium"}
            onChange={(e) => setPriority(e.target.value)}
          />
        </label>
        <label className={css.radioLabel}>
          <span>High</span>
          <input
            type="radio"
            name="priority"
            value="high"
            checked={priority === "high"}
            onChange={(e) => setPriority(e.target.value)}
          />
        </label>
      </div>
      <button className={css.btn} type="submit" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
};

export default TodoForm;
