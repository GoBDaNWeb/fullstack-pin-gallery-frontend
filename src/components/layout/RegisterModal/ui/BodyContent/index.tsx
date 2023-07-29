import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import {
  useAddRegisterUserMutation,
  useAddUploadUserMutation,
} from "@/shared/api";
import { handleOpenRegisterModal } from "@/shared/store/slices/modal/modalSlice";
import { useAppDispatch } from "@/shared/store";

import styles from "./styles.module.sass";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { setUser } from "@/shared/store/slices/user/userSlice";
import useUpload from "@/shared/hooks/useUpload";
import UploadAvatar from "../UploadAvatar";
import { ErrorType, IError } from "@/shared/types/error.interface";

const BodyContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const [userRegister] = useAddRegisterUserMutation();
  const [addUploadUser] = useAddUploadUserMutation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      avatarUrl: "",
    },
  });

  const watchImage = watch("avatarUrl");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");
  const watchPassword = watch("password");
  const watchEmail = watch("email");

  const { upload, image } = useUpload(watchImage[0], addUploadUser, undefined);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const registerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        avatarUrl: image,
      };

      const registerResponse = await userRegister(registerData).unwrap();

      window.localStorage.setItem("token", registerResponse.token);
      dispatch(setUser(registerResponse));
      dispatch(handleOpenRegisterModal(false));
    } catch (err: unknown) {
      const error = err as IError;
      console.log(error);
      setError(error.data[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    upload();
  }, [watchImage]);

  useEffect(() => {
    setError("");
  }, [watchFirstName, watchLastName, watchPassword, watchEmail]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
      <div className={styles.uploadWrapper}>
        <UploadAvatar id="avatarUrl" register={register} avatar={image} />
      </div>
      <div className={styles.name}>
        <Input
          id="firstName"
          type="text"
          placeholder="Имя"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="lastName"
          type="text"
          placeholder="Фамилия"
          register={register}
          required
          errors={errors}
        />
      </div>

      <Input
        id="email"
        type="email"
        placeholder="Почта"
        register={register}
        required
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        placeholder="Пароль"
        register={register}
        required
        errors={errors}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      <div className={styles.buttonWrapper}>
        <Button disabled={isLoading}>Зарегестрироваться</Button>
      </div>
    </form>
  );
};

export default BodyContent;
