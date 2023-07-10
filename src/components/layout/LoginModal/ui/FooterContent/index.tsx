import {
  handleOpenLoginModal,
  handleOpenRegisterModal,
} from "@/shared/store/slices/modal/modalSlice";
import styles from "./styles.module.sass";

import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/shared/store";

const FooterContent = () => {
  const dispatch = useAppDispatch();

  const handleChangeModal = () => {
    dispatch(handleOpenLoginModal(false));
    dispatch(handleOpenRegisterModal(true));
  };

  return (
    <div className={styles.footer}>
      нет аккаунта?
      <button onClick={handleChangeModal}>зарегестрируйтесь!</button>
    </div>
  );
};

export default FooterContent;
