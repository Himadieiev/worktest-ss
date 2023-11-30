import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import css from "./TodoForm.module.css";
import { addTodo, updateTodo } from "../../redux/thunk";

const TodoForm = ({ toggleModal, editTodo }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  // Ефект для встановлення фокусу на полі вводу заголовку при відкритті модального вікна з формою
  useEffect(() => {
    const inputElement = document.getElementById("titleInput");
    if (inputElement) {
      inputElement.focus();
    }

    if (editTodo) {
      setTitle(editTodo.title);
      setText(editTodo.text);
      setPriority(editTodo.priority);
      setIsEditing(true);
    }
  }, [editTodo]);

  // Обробник відправлення форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await dispatch(
          updateTodo({
            todoId: editTodo.id,
            updatedData: { title, text, priority },
          })
        );
        toggleModal();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      try {
        await dispatch(addTodo({ title, text, priority }));
        toggleModal();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }

    // Очищення полів форми після відправки
    setTitle("");
    setText("");
    setPriority("low");
    setIsEditing(false);
  };

  // Обробник кнопки закриття форми
  const handleCloseBtn = () => {
    toggleModal();
  };

  return (
    <form className={css.form}>
      <button type="button" className={css.closeBtn} onClick={handleCloseBtn}>
        x
      </button>
      <h2 className={css.title}>
        {isEditing ? "Update To Do" : "Create To Do"}
      </h2>
      <label className={css.label}>
        Title
        <br />
        <input
          id="titleInput"
          className={css.input}
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={css.label}>
        Text
        <br />
        <textarea
          className={css.textarea}
          value={text}
          placeholder="Enter text"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <div className={css.radioInputs}>
        <label className={css.radioLabel}>
          <span>Low</span>
          <input
            className={css.radioInput}
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
            className={css.radioInput}
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
            className={css.radioInput}
            type="radio"
            name="priority"
            value="high"
            checked={priority === "high"}
            onChange={(e) => setPriority(e.target.value)}
          />
        </label>
      </div>
      <button className={css.btn} type="submit" onClick={handleSubmit}>
        {isEditing ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TodoForm;
