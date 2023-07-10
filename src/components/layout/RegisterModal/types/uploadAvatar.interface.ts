import { FieldValues, UseFormRegister } from "react-hook-form";

export interface IUploadAvatarProps {
  id: string;
  avatar?: string;
  register: UseFormRegister<FieldValues>;
}
