import { useRouter } from "next/router";

import styles from "./styles.module.sass";

import Comment from "../Comment";
import CommentForm from "../CommentForm";
import { useGetCommentsQuery } from "@/api";
import { useSelector } from "react-redux";
import { selectAuthData } from "@/shared/store/slices/user/selectors";
import { useEffect } from "react";

const PinComments = () => {
  const {
    query: { id },
  } = useRouter();

  const currentUser = useSelector(selectAuthData);

  const { data: comments, isFetching, refetch } = useGetCommentsQuery(id);

  useEffect(() => {
    refetch();
  }, [isFetching, refetch]);

  return (
    <div className={styles.pinComments}>
      <h4>Комментарии</h4>
      <div className={styles.commentsWrapper}>
        {comments && comments.length > 0 ? (
          <div className={styles.commentsList}>
            {comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyComments}>Комментариев нет</div>
        )}
      </div>
      {currentUser && <CommentForm />}
    </div>
  );
};

export default PinComments;
