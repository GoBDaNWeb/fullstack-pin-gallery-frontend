type PinedType = {
  title: string;
  imageUrl: string;
  description?: string;
  author: string;
  viewsCount: number;
  _id: string;
};

export interface IRegisterQuery {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface ILoginQuery {
  email: string;
  password: string;
}

export interface ISavePinQuery {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  author: string;
  userId: string;
  viewsCount: number;
}

export interface IRemovePinQuery {
  pinId: string;
  userId: string;
}
export interface IUpdateAvatarQuery {
  avatar: string;
  userId: string;
}

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
