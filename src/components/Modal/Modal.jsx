import { createPortal } from "react-dom";
import { useEffect } from "react";

import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children, toggleModal }) {
  // Обробник кліку на задньому фоні модального вікна
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  // Ефект для слухання клавіші "Escape" для закриття модального вікна
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Прибирання слухача подій при виході з компонента
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModal]);

  // Використання createPortal для рендерингу модального вікна в іншому DOM-вузлі
  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.content}>
        <div>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
