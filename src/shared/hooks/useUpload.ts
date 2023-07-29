import { useState } from "react";

import {
  useLazyGetAuthMeQuery,
  useUpdateUserAvatarMutation,
} from "@/shared/api";
import { IUser } from "../types/user.interface";

interface IRespose {
  upload: () => Promise<void>;
  reset: () => void;
  image: string;
}

const useUpload = (
  imageObj: File,
  uploadFunc: any,
  currentUser?: IUser
): IRespose => {
  const [image, setImage] = useState("");
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const [fetchCurrentUser] = useLazyGetAuthMeQuery();

  const upload = async (): Promise<void> => {
    try {
      if (!imageObj?.name) return;
      const formData = new FormData();
      formData.append("image", imageObj);
      console.log("formData", formData);

      const uploadData = await uploadFunc(formData).unwrap();
      if (currentUser) {
        updateUserAvatar({
          userId: currentUser._id,
          avatar: uploadData.url,
        });
        fetchCurrentUser();
      }
      setImage(uploadData.url);
    } catch (e) {
      console.log(e);
    }
  };

  const reset = () => {
    setImage("");
  };

  return { upload, reset, image };
};

export default useUpload;
