import { useAddRegisterUserMutation, useAddUploadUserMutation } from "@/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppDispatch } from "@/shared/store";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.sass";
import UploadAvatar from "../UploadAvatar";
import useUpload from "@/shared/hooks/useUpload";
import { handleOpenRegisterModal } from "@/shared/store/slices/modal/modalSlice";

const BodyContent = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      if (!registerResponse) {
        return alert("Не удалось авторизоваться");
      }
      window.localStorage.setItem("token", registerResponse.token);
      dispatch(setUser(registerResponse));
      dispatch(handleOpenRegisterModal(false));
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    upload();
  }, [watchImage]);

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
      <div className={styles.buttonWrapper}>
        <Button func={handleSubmit(onSubmit)} disabled={isLoading}>
          Зарегестрироваться
        </Button>
      </div>
    </form>
  );
};

export default BodyContent;
