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

export interface IRegisterProps {
    changeAuthHandle: () => void;
}

export interface ILoginProps {
    changeAuthHandle: () => void;
}
