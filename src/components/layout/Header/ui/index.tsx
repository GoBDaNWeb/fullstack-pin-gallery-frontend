import Link from "next/link";
import { useSelector } from "react-redux";

import { selectAuthData } from "@/shared/store/slices/user/selectors";
import { useAppDispatch } from "@/shared/store";
import { handleOpenLoginModal } from "@/shared/store/slices/modal/modalSlice";
import { useGetAuthMeQuery } from "@/shared/api";

import styles from "./styles.module.sass";

import { Logo } from "@/components/ui/Logo";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { logout } from "@/shared/store/slices/user/userSlice";
import { Skeleton } from "@/components/ui/Skeleton";
import { Burger } from "@/components/ui/Burger";

const Header = () => {
  const { isLoading } = useGetAuthMeQuery();
  const currentUser = useSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const openLoginModal = () => {
    dispatch(handleOpenLoginModal(true));
  };

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={`${styles.header} container`}>
        <Logo />
        {isLoading ? (
          <Skeleton customStyles={{ width: "300px", height: "30px" }} />
        ) : (
          <>
            {!currentUser ? (
              <button onClick={openLoginModal}>Войти</button>
            ) : (
              <>
                <div className={styles.authUser}>
                  <Link href={"/create-pin"}>Добавить пин</Link>
                  <Link href={`/user/${currentUser?._id}`}>
                    <UserAvatar
                      avatarUrl={currentUser?.avatarUrl}
                      firstName={currentUser?.firstName}
                    />
                  </Link>
                  <button onClick={handleLogout} className="cursor-pointer">
                    Выход
                  </button>
                </div>
                <Burger />
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
