import { IAuthor } from "@/shared/types/author.interface";

type Comment = {
  _id: string;
  text: string;
  author: IAuthor;
  postId: string;
  createdAt: string;
  updatedAt: string;
};
export interface ICommentProps {
  comment: Comment;
}
