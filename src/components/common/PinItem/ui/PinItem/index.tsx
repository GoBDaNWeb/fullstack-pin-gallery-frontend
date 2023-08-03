import { FC, useState, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectAuthData } from "@/shared/store/slices/user/selectors";

import { IPinItemProps } from "../../types/pinItem.interface";

import styles from "./styles.module.sass";

import { BsEyeFill } from "react-icons/bs";
import { UserAvatar } from "@/components/ui/UserAvatar";
import PinFunctional from "./../PinFunctional/index";

const PinItem: FC<IPinItemProps> = ({ pin }) => {
  const [imageLoading, setImageLoding] = useState(true);

  const router = useRouter();

  const currentUser = useSelector(selectAuthData);

  const navigateToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/user/${pin.author._id}`);
  };

  return (
    <div
      onClick={() => router.push(`/pin/${pin._id}`)}
      className={styles.pinItem}
    >
      <div className={styles.backdrop} />
      <div
        className={`${styles.imageWrapper} ${imageLoading ? styles.blur : ""}`}
      >
        <Image
          fill
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_ENV_API_URL}${pin.imageUrl}`}
          sizes="100vw"
          alt="pin"
          onLoadingComplete={() => setImageLoding(false)}
        />
      </div>
      <div onClick={navigateToProfile} className={styles.userData}>
        <UserAvatar
          avatarUrl={pin.author.avatarUrl}
          firstName={pin.author.firstName}
        />
        <h4>
          {pin.author.firstName} {pin.author.lastName}
        </h4>
      </div>
      <div className={styles.viewsCount}>
        <BsEyeFill />
        <span>{pin.viewsCount}</span>
      </div>
      {currentUser?._id !== pin.author._id ? (
        <div className={styles.pinFunctionWrapper}>
          <PinFunctional pin={pin} />
        </div>
      ) : null}
    </div>
  );
};

export default memo(PinItem);
