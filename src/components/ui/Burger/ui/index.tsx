import { selectIsOpenMobileMenu } from "@/shared/store/slices/modal/selectors";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/shared/store";
import { handleOpenMobileMenu } from "@/shared/store/slices/modal/modalSlice";

import styles from "./styles.module.sass";

const Burger = () => {
  const dispatch = useAppDispatch();
  const burgerIsActive = useSelector(selectIsOpenMobileMenu);

  return (
    <div
      onClick={() => dispatch(handleOpenMobileMenu())}
      className={styles.burger}
    >
      <div className={burgerIsActive ? styles.active : styles.default} />
    </div>
  );
};

export default Burger;
