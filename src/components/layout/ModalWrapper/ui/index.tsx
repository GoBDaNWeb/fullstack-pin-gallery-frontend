import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/store";

import { IModalWrapperProps } from "../types/modalWrapper.interface";

import styles from "./styles.module.sass";

import { IoMdClose } from "react-icons/io";
import { Backdrop } from "@/components/common/Backdrop";
const ModalWrapper: FC<IModalWrapperProps> = ({
  body,
  footer,
  onClose,
  isOpen,
  title,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Backdrop onClose={handleClose} isShow={showModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
        <div className={styles.modalContentTop}>
          <button onClick={handleClose}>
            <IoMdClose size={18} />
          </button>
          <h5>{title}</h5>
        </div>
        {body}
        <hr />
        {footer}
      </div>
    </Backdrop>
  );
};

export default ModalWrapper;
