import { IAuthor } from "@/shared/types/author.interface";

export interface ICommentQueryResponse {
  _id: string;
  text: string;
  author: IAuthor;
  postId: string;
  createdAt: string;
  updatedAt: string;
}
