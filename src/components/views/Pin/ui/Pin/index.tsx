import styles from "./styles.module.sass";

import PinInfo from "../PinInfo";

const Pin = () => {
  return (
    <div className={`container ${styles.pin}`}>
      <PinInfo />
    </div>
  );
};

export default Pin;
