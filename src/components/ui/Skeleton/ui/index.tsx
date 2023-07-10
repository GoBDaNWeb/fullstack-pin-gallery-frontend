import { FC } from "react";
import { ISkeletonProps } from "../types/skeleton.interface";
import styles from "./styles.module.sass";

const Skeleton: FC<ISkeletonProps> = ({ customStyles }) => {
  return <div style={{ ...customStyles }} className={styles.skeleton} />;
};

export default Skeleton;
