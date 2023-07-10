import { IAuthor } from "@/shared/types/author.interface";

export type PinDataType = {
  _id: string;
  imageUrl: string;
  title: string;
  description?: string;
  tags?: string[];
  author: IAuthor;
  rating: number;
  viewsCount: number;
};

export interface IPinState {
  currentPin: PinDataType | null;
  isNewPins: boolean;
  isCreated: boolean;
}
