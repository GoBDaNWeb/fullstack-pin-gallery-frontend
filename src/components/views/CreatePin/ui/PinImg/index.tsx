import { FC } from "react";
import Image from "next/image";

import { IPinImageProps } from "../../types/pinImage.interface";

import styles from "./styles.module.sass";

import { MdPhotoCamera } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const PinImg: FC<IPinImageProps> = ({
  id,
  register,
  pinImage,
  clearImageUrl,
}) => {
  return (
    <>
      <div className={styles.pinImg}>
        {pinImage ? (
          <div className={styles.imageWrapper}>
            <Image
              src={`${process.env.NEXT_PUBLIC_ENV_API_URL}${pinImage}`}
              alt="pin upload"
              fill
              sizes="100vw"
            />
          </div>
        ) : (
          <div className={styles.addBtn}>
            <MdPhotoCamera />
          </div>
        )}
        {pinImage && (
          <div onClick={clearImageUrl} className={styles.clearBtn}>
            <AiOutlineClose />
          </div>
        )}
        <input type="file" {...register(id)} />
      </div>
    </>
  );
};

export default PinImg;
