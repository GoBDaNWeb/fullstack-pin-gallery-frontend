import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IFieldsProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
