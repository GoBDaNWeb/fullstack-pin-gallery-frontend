import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IInputProps {
  id: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}
