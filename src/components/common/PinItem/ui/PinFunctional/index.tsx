import { FC, useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";

import { IPinFunctionalProps } from "./../../types/pinFunctiona.interface";

import { selectAuthData } from "@/shared/store/slices/user/selectors";
import {
  useLazyGetAuthMeQuery,
  useLazyGetPinedQuery,
  useUpdateUserRemovePinMutation,
  useUpdateUserSavePinMutation,
} from "@/shared/api";
import { useAppDispatch } from "@/shared/store";
import { handleOpenLoginModal } from "@/shared/store/slices/modal/modalSlice";

import styles from "./styles.module.sass";

import { TbPinnedOff, TbPin } from "react-icons/tb";

const PinFunctional: FC<IPinFunctionalProps> = ({ pin }) => {
  const [isPined, setPined] = useState(false);

  const currentUser = useSelector(selectAuthData);

  const dispatch = useAppDispatch();

  const [fetchCurrentUser] = useLazyGetAuthMeQuery();
  const [fetchPined] = useLazyGetPinedQuery();
  const [userSavePin] = useUpdateUserSavePinMutation();
  const [userRemovePin] = useUpdateUserRemovePinMutation();

  const savePin = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (currentUser) {
      const savedPin = {
        _id: pin._id,
        title: pin.title,
        description: pin.description,
        imageUrl: pin.imageUrl,
        author: pin.author._id,
        userId: currentUser?._id,
        viewsCount: pin.viewsCount,
      };
      userSavePin(savedPin);
      fetchPined(currentUser._id);
      fetchCurrentUser();
      setPined(true);
    } else {
      dispatch(handleOpenLoginModal(true));
    }
  };

  const removePin = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (currentUser) {
      const removedPin = {
        pinId: pin._id,
        userId: currentUser?._id,
      };
      userRemovePin(removedPin);
      fetchPined(currentUser._id);
      fetchCurrentUser();
      setPined(false);
    }
  };

  useEffect(() => {
    const filtered = currentUser?.pined?.filter(
      (currentPin) => currentPin._id === pin._id
    );
    filtered && setPined(filtered.length > 0);
  }, []);

  return (
    <>
      {isPined ? (
        <div onClick={removePin} className={styles.iconWrapper}>
          <TbPinnedOff />
        </div>
      ) : (
        <div onClick={savePin} className={styles.iconWrapper}>
          <TbPin />
        </div>
      )}
    </>
  );
};

export default memo(PinFunctional);
