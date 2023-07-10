import { FC } from "react";
import Image from "next/image";

import { IPinImgProps } from "../../types/pinImg.interface";

import { selectCurrentPin } from "@/shared/store/slices/pin/selectors";

import styles from "./styles.module.sass";
import { Skeleton } from "@/components/ui/Skeleton";

const PinImg: FC<IPinImgProps> = ({ img, isLoading }) => {
  return (
    <>
      <div className={styles.imageWrapper}>
        {isLoading || !img ? (
          <Skeleton
            customStyles={{
              maxWidth: "450px",
              aspectRatio: ".8",
              width: "100%",
              maxHeight: "600px",
              height: "100%",
            }}
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_ENV_API_URL}${img}`}
            alt="Pin"
            fill
            sizes="100vw"
          />
        )}
      </div>
    </>
  );
};

export default PinImg;
