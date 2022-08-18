export interface IPin {
    _id: string,
    author: IAuthor,
    description?: string,
    imageUrl: string,
    title: string,
    viewsCount: number,
    createdAt?: string,
    updatedAt?: string,
}

export interface IPined {
    _id: string,
    author: string,
    description?: string,
    imageUrl: string,
    title: string,
    viewsCount: number,
}

export interface IAuthor {
    _id: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    email: string,
    pined?: IPin[],
    createdAt?: string,
    updatedAt?: string,
    token?: string
}
export interface ICurrentUser {
    __v?: number,
    _id: string,
    avatarUrl?: string,
    createdAt?: string,
    email: string,
    firstName: string,
    lastName: string,
    pined?: IPined[],
    token?: string
    updatedAt?: string,
}

export interface IPinItemProps {
    _id: string,
    author: IAuthor,
    description?: string,
    imageUrl: string,
    title: string,
    viewsCount: number,
}

export interface IPinedLogicProps {
    currentUser: ICurrentUser | null, 
    _id: string,
    author: IAuthor,
    description?: string,
    imageUrl: string,
    title: string,
    viewsCount: number,
}