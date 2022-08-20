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

export interface IAuth {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    pined: IPin[];
    token: string;
}
export interface IComment {
    _id: string;
    text: string;
    author: IAuthor;
    postId: string;
    createdAt: string;
    updatedAt: string;
}
export interface ICommentProps {
    comment: IComment;
}
