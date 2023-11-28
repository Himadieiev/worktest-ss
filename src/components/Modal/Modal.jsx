import { createPortal } from "react-dom";
import { useEffect } from "react";

import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children, toggleModal }) {
  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModal]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.content}>
        <div>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
