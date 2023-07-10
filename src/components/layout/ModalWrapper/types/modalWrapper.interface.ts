import { ReactElement } from "react";

export interface IModalWrapperProps {
  body?: ReactElement;
  footer?: ReactElement;
  onClose: () => void;
  isOpen: boolean;
  title: string;
}
