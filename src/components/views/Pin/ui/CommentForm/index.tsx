import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { selectAuthData } from "@/shared/store/slices/user/selectors";
import { useAddCommentMutation, useGetCommentsQuery } from "@/shared/api";

import styles from "./styles.module.sass";

import { Input } from "@/components/ui/Input";
import { UserAvatar } from "@/components/ui/UserAvatar";

const CommentForm = () => {
  const {
    query: { id },
  } = useRouter();
  const currentUser = useSelector(selectAuthData);

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      text: "",
    },
  });

  const { refetch: refetchComments } = useGetCommentsQuery(id);

  const [addComment] = useAddCommentMutation();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const params = {
      text: data.text,
      id,
    };
    addComment(params);
    refetchComments();
    resetField("text");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <UserAvatar
        avatarUrl={currentUser?.avatarUrl}
        firstName={currentUser?.firstName}
      />
      <Input
        id="text"
        type="text"
        placeholder="Оставить комментарий"
        register={register}
      />
    </form>
  );
};

export default CommentForm;
