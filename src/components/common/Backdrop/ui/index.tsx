import { FC, PropsWithChildren, memo } from "react";
import { IBackdropProps } from "../types/backdrop.interface";

import styles from "./styles.module.sass";

const Backdrop: FC<PropsWithChildren<IBackdropProps>> = ({
  onClose,
  isShow,
  style,
  children,
}) => {
  return (
    <div
      onClick={onClose}
      className={`${styles.backdrop} ${
        isShow ? styles.visibleBackdop : styles.hiddenBackdrop
      }`}
      style={style}
    >
      {children}
    </div>
  );
};

export default memo(Backdrop);
