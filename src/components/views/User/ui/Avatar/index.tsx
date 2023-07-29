import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useGetUserQuery } from "@/shared/api";
import { selectAuthData } from "@/shared/store/slices/user/selectors";

import styles from "./styles.module.sass";

import CurrentUserAvatar from "../CurrentUserAvatar";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { Skeleton } from "@/components/ui/Skeleton";

const Avatar = () => {
  const {
    query: { id },
  } = useRouter();

  const currentUser = useSelector(selectAuthData);

  const { data: user } = useGetUserQuery(id);

  return (
    <div className={styles.avatar}>
      {currentUser?._id === id ? (
        <CurrentUserAvatar />
      ) : (
        <UserAvatar
          size={80}
          fontSize={2}
          avatarUrl={user?.avatarUrl}
          firstName={user?.firstName}
        />
      )}

      {user?.firstName ? (
        <h5>
          {user?.firstName} {user?.lastName}
        </h5>
      ) : (
        <Skeleton customStyles={{ width: "100px", height: "16px" }} />
      )}
    </div>
  );
};

export default Avatar;
