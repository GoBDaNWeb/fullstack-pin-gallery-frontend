import { IPin } from "./pin.interface";

export interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email: string;
  pined?: IPin[];
  createdAt?: string;
  updatedAt?: string;
  token?: string;
}
