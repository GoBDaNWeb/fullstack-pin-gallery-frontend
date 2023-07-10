import { FieldValues, UseFormRegister } from "react-hook-form";

export interface IPinImageProps {
  id: string;
  pinImage?: string | null;
  register: UseFormRegister<FieldValues>;
  clearImageUrl?: () => void;
}
