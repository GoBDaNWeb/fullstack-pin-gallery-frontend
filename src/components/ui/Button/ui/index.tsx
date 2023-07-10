import { FC, PropsWithChildren } from "react";

import styles from "./styles.module.sass";

const Button: FC<PropsWithChildren<any>> = ({
  func,
  children,
  disabled,
  active,
}) => {
  const onClick = () => {
    if (disabled) return;
    func();
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
