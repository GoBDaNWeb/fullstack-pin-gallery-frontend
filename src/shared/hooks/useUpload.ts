import { useLazyGetAuthMeQuery, useUpdateUserAvatarMutation } from "@/api";
import { useState } from "react";

interface IRespose {
  upload: () => Promise<void>;
  reset: () => void;
  image: string;
}

const useUpload = (
  imageObj: any,
  uploadFunc: any,
  currentUser?: any
): IRespose => {
  const [image, setImage] = useState("");
  const [updateUserAvatar] = useUpdateUserAvatarMutation();
  const [fetchCurrentUser] = useLazyGetAuthMeQuery();

  // console.log("imageObj", imageObj);
  // console.log("uploadFunc", uploadFunc);
  // console.log("updateAvatar", updateAvatar);
  // console.log("currentUser", currentUser);

  const upload = async (): Promise<any> => {
    // console.log("imageObj", imageObj);
    // console.log("currentUserUPLOAD", currentUser);

    try {
      if (!imageObj?.name) return;
      const formData = new FormData();
      formData.append("image", imageObj);
      const uploadData = await uploadFunc(formData).unwrap();
      // console.log("uploadData", uploadData);

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
