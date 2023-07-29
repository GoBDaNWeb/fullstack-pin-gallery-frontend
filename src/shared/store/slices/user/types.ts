import { IPin } from "@/shared/types/pin.interface";
import { IUser } from "@/shared/types/user.interface";

export interface IAuthState {
  data: IUser | null;
}
