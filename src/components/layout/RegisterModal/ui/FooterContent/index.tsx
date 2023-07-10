import { useAppDispatch } from "@/shared/store";
import {
  handleOpenLoginModal,
  handleOpenRegisterModal,
} from "@/shared/store/slices/modal/modalSlice";
import styles from "./styles.module.sass";

const FooterContent = () => {
  const dispatch = useAppDispatch();

  const handleChangeModal = () => {
    dispatch(handleOpenRegisterModal(false));
    dispatch(handleOpenLoginModal(true));
  };

  return (
    <div className={styles.footer}>
      есть аккаунт?
      <button onClick={handleChangeModal}>войдите!</button>
    </div>
  );
};

export default FooterContent;
