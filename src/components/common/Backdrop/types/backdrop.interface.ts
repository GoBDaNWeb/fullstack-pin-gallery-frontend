import { CSSProperties } from "react";

export interface IBackdropProps {
  onClose: () => void;
  isShow: boolean;
  style?: CSSProperties;
}
