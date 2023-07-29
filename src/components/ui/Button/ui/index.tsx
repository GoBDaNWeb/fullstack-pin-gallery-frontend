import { FC, PropsWithChildren } from "react";

import { IButtonProps } from "../types/button.interface";

import styles from "./styles.module.sass";

const Button: FC<PropsWithChildren<IButtonProps>> = ({
  func,
  children,
  disabled,
  active,
}) => {
  const onClick = () => {
    if (disabled) return;
    if (func) {
      func();
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${active ? styles.active : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
