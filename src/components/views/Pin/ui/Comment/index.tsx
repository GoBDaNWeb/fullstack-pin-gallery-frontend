import { FC } from "react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { ICommentProps } from "../../types/comment.interface";

import styles from "./styles.module.sass";
import Link from "next/link";

const Comment: FC<ICommentProps> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <Link href={`/user/${comment.author._id}`} className={styles.author}>
        <UserAvatar
          avatarUrl={comment.author.avatarUrl}
          firstName={comment.author.firstName}
        />
        <div className={styles.authorName}>
          <div>{comment.author.firstName}</div>
          <div>{comment.author.lastName}</div>
        </div>
      </Link>
      <div className={styles.text}>{comment.text}</div>
    </div>
  );
};

export default Comment;
