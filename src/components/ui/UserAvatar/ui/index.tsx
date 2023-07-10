import { FC } from "react";
import Image from "next/image";

import { IUserAvatarProps } from "./../types/userAvatar.interface";

import styles from "./styles.module.sass";

const UserAvatar: FC<IUserAvatarProps> = ({
  avatarUrl,
  firstName,
  size = 40,
  fontSize = 1,
}) => {
  return (
    <>
      {avatarUrl ? (
        <div
          className={styles.imageWrapper}
          style={{
            height: `${size}px`,
            width: `${size}px`,
            minWidth: `${size}px`,
            minHeight: `${size}px`,
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_ENV_API_URL}${avatarUrl}`}
            alt="avatar"
            fill
            sizes="100vw"
          />
        </div>
      ) : (
        <div
          className={styles.userAvatar}
          style={{
            height: `${size}px`,
            width: `${size}px`,
            fontSize: `${fontSize}rem`,
          }}
        >
          {firstName && firstName[0].toUpperCase()}
        </div>
      )}
    </>
  );
};

export default UserAvatar;
