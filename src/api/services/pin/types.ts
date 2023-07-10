import { IAuthor } from "@/shared/types/author.interface";

export interface IPinQueryResponse {
  title: string;
  imageUrl: string;
  description?: string;
  author: IAuthor;
  viewsCount: number;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ICreatePinQuery {
  title: string;
  imageUrl: string;
  description?: string;
}
