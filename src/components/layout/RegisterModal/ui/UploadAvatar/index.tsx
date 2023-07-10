import { FC } from "react";
import Image from "next/image";

import { IUploadAvatarProps } from "./../../types/uploadAvatar.interface";

import styles from "./styles.module.sass";
import { MdPhotoCamera } from "react-icons/md";

const UploadAvatar: FC<IUploadAvatarProps> = ({ id, avatar, register }) => {
  return (
    <div className={styles.upload}>
      {avatar ? (
        <div className={styles.imageWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_ENV_API_URL}${avatar}`}
            alt="Avatar"
            fill
            sizes="100vw"
          />
        </div>
      ) : (
        <MdPhotoCamera className={styles.icon} />
      )}
      <input type="file" {...register(id)} />
    </div>
  );
};

export default UploadAvatar;
