import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

import {
  useAddUploadUserMutation,
  useGetAuthMeQuery,
  useLazyGetAuthMeQuery,
} from "@/api";
import useUpload from "@/shared/hooks/useUpload";

import styles from "./styles.module.sass";

import { MdPhotoCamera } from "react-icons/md";
import { UserAvatar } from "@/components/ui/UserAvatar";

const CurrentUserAvatar = () => {
  const [addUploadUser] = useAddUploadUserMutation();
  const [fetchCurrentUser] = useLazyGetAuthMeQuery();
  const { data: currentUser, refetch } = useGetAuthMeQuery();

  const { register, watch } = useForm<FieldValues>({
    defaultValues: {
      imageUrl: "",
    },
  });

  const watchImage = watch("imageUrl");

  const { upload, image } = useUpload(
    watchImage[0],
    addUploadUser,
    currentUser
  );

  useEffect(() => {
    fetchCurrentUser();
    refetch();
  }, [image, fetchCurrentUser]);

  useEffect(() => {
    if (watchImage[0]) {
      upload();
    }
  }, [watchImage[0]]);

  return (
    <div className={styles.currentAvatar}>
      <div className={styles.nonPhoto}>
        <UserAvatar
          avatarUrl={currentUser?.avatarUrl}
          fontSize={2}
          size={80}
          firstName={currentUser?.firstName}
        />

        <button className={styles.addPhoto}>
          <MdPhotoCamera className={styles.icon} />
        </button>
        <input type="file" {...register("imageUrl")} />
      </div>
    </div>
  );
};

export default CurrentUserAvatar;
