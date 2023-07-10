import { IAuthor } from "./author.interface";

export interface IPin {
  _id: string;
  author: IAuthor;
  description?: string;
  imageUrl: string;
  title: string;
  viewsCount: number;
  createdAt?: string;
  updatedAt?: string;
}
