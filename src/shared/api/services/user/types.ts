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
type Body = {
  email: string;
  password: string;
};
export interface IArgs {
  body: Body;
  method: string;
  url: string;
}
