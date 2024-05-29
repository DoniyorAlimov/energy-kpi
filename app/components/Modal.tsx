"use client";
import classNames from "classnames";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  renderTriggerButton,
  header,
  content,
  isOpen,
  onClose,
}: {
  renderTriggerButton: ReactNode;
  header: string;
  content: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {renderTriggerButton}

      <div
        className={classNames({
          block: isOpen,
          hidden: !isOpen,
          modal: true,
        })}
      >
        <div className="modal__container">
          <header className="modal__header">
            <h2 className="modal__heading">{header}</h2>
            <IoMdClose className="modal__close__icon" onClick={onClose} />
          </header>
          <div className="modal__content">{content}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
