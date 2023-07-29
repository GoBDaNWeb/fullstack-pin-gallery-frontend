import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useSelector } from "react-redux";

import { selectAuth } from "@/shared/store/slices/user/selectors";
import {
  useAddPinMutation,
  useAddUploadPinMutation,
  useGetAuthMeQuery,
} from "@/shared/api";

import styles from "./styles.module.sass";

import Fields from "../Fields";
import PinImg from "../PinImg";
import { Button } from "@/components/ui/Button";
import useUpload from "@/shared/hooks/useUpload";

const CreatePin = () => {
  const router = useRouter();

  const isAuth = useSelector(selectAuth);

  const { isLoading } = useGetAuthMeQuery();
  const [uploadPin] = useAddUploadPinMutation();
  const [addPin] = useAddPinMutation();

  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const watchImage = watch("imageUrl");

  const { upload, reset, image } = useUpload(watchImage[0], uploadPin);

  useEffect(() => {
    upload();
  }, [watchImage]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const pinParams = {
      imageUrl: image,
      title: data.title,
      description: data.description,
    };

    const pinData = await addPin(pinParams).unwrap();

    router.push(`/pin/${pinData._id}`);
  };

  const resetImage = () => {
    reset();
    resetField("imageUrl");
  };

  useEffect(() => {
    if (!isLoading && !isAuth) {
      router.push("/");
    }
  }, [isAuth, isLoading, router]);

  return (
    <div className={`${styles.createPin} container`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createPinContent}
      >
        <PinImg
          id="imageUrl"
          register={register}
          pinImage={image}
          clearImageUrl={resetImage}
        />
        <Fields register={register} errors={errors} />
        <Button func={() => {}}>создать</Button>
      </form>
    </div>
  );
};

export default CreatePin;
