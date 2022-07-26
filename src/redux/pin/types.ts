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
