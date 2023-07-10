type PinedType = {
  title: string;
  imageUrl: string;
  description?: string;
  author: string;
  viewsCount: number;
  _id: string;
};

export interface IAuthQueryResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  pined: PinedType[];
  token: string;
}

export interface IAuthState {
  data: IAuthQueryResponse | null;
}
