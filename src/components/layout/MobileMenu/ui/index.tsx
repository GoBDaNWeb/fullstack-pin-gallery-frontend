import { useAppDispatch } from "@/shared/store";
import styles from "./styles.module.sass";
import { useSelector } from "react-redux";
import { selectIsOpenMobileMenu } from "@/shared/store/slices/modal/selectors";
import { Backdrop } from "@/components/common/Backdrop";
import { useEffect, useState } from "react";
import { handleOpenMobileMenu } from "@/shared/store/slices/modal/modalSlice";
import Link from "next/link";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { selectAuthData } from "@/shared/store/slices/user/selectors";
import { logout } from "@/shared/store/slices/user/userSlice";

const MobileMenu = () => {
  const isOpen = useSelector(selectIsOpenMobileMenu);
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectAuthData);

  const handleOpenMenu = () => {
    dispatch(handleOpenMobileMenu());
  };

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <Backdrop onClose={handleOpenMenu} isShow={isOpen} style={{ zIndex: 45 }}>
      <div className={styles.mobileMenu}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${styles.mobileMenuContent} ${
            isOpen ? styles.isOpen : ""
          }`}
        >
          <Link href={"/create-pin"}>Добавить пин</Link>
          <Link href={`/user/${currentUser?._id}`}>
            <UserAvatar
              avatarUrl={currentUser?.avatarUrl}
              firstName={currentUser?.firstName}
              size={80}
            />
          </Link>
          <button onClick={handleLogout}>Выход</button>
        </div>
      </div>
    </Backdrop>
  );
};

export default MobileMenu;
