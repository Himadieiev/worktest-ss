import { useState } from "react";

import css from "./Header.module.css";
import Modal from "../Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <header className={`${css.header} container`}>
      <h1 className={css.title}>To Do List App</h1>
      <button type="button" className={css.btn} onClick={() => toggleModal()}>
        Add To Do
      </button>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <TodoForm toggleModal={toggleModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
