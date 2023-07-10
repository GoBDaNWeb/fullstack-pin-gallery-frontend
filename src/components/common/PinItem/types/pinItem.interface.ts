import { IAuthor } from "@/shared/types/author.interface";

type IPinItem = {
  _id: string;
  author: IAuthor;
  description?: string;
  imageUrl: string;
  title: string;
  viewsCount: number;
};
export interface IPinItemProps {
  pin: IPinItem;
}
