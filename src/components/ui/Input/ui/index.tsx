import { FC } from "react";

import { IInputProps } from "../types/input.interface";

import styles from "./styles.module.sass";

const Input: FC<IInputProps> = ({
  id,
  required,
  type = "text",
  placeholder,
  disabled,
  register,
  errors,
}) => {
  return (
    <input
      type={type}
      disabled={disabled}
      {...register(id, { required })}
      placeholder={placeholder}
      className={`${styles.input} ${
        errors && errors[id] ? styles.error : null
      }`}
    />
  );
};

export default Input;
