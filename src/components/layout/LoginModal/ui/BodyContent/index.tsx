import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import styles from "./styles.module.sass";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/shared/store";
import { useAddLoginUserMutation } from "@/api";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { handleOpenLoginModal } from "@/shared/store/slices/modal/modalSlice";

const BodyContent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const [userLogin] = useAddLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const loginResponse = await userLogin(loginData).unwrap();
      if (!loginResponse) {
        return alert("Не удалось авторизоваться");
      }
      window.localStorage.setItem("token", loginResponse.token);
      dispatch(setUser(loginResponse));
      dispatch(handleOpenLoginModal(false));
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
      <Input
        id="email"
        placeholder="Почта"
        register={register}
        required
        errors={errors}
      />
      <Input
        id="password"
        placeholder="Пароль"
        type="password"
        register={register}
        required
        errors={errors}
      />
      <div className={styles.buttonWrapper}>
        <Button func={handleSubmit(onSubmit)} disabled={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  );
};

export default BodyContent;
