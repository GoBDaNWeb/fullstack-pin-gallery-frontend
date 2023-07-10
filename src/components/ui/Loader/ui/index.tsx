import { CircleLoader } from "react-spinners";
import styles from "./styles.module.sass";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <CircleLoader size={100} color="#36c8d6" />
    </div>
  );
};

export default Loader;
