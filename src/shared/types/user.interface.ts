import { IPin } from "./pin.interface";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  pined: IPin[];
  token: string;
}
