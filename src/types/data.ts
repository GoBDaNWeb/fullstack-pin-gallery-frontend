export interface IAuthor {
    _id: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    email: string,
    pined?: IPin[],
    createdAt?: string,
    updatedAt?: string,
}

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

export interface IProfileFeedProps {
    isCreated: boolean,
}

export enum AuthStatus {
    LOADING = 'loading',
    SUCCESS = 'loaded',
    ERROR = 'error'
}

export interface IAuthData {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    createdAt: string,
    updatedAt: string,
    token: string,
    pined: Record<string, string>[]
}

export interface ILoginData {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    createdAt: string,
    updatedAt: string,
    token: string,
    pined: Record<string, string>[]
}
export interface IAuthData {
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    createdAt: string,
    updatedAt: string,
    token: string,
    pined: Record<string, string>[]
}

export interface IAuthState {
    data: IAuthData | null,
    status: AuthStatus
}

export enum PinStatus {
    LOADING = 'loading',
    SUCCESS = 'loaded',
    ERROR = 'error'
}

export type AuthorType = {
    _id: string,
    email: string,
    password: string,
    fullName: string,
    avatarUrl?: string,
    createdAt: string,
    updatedAt: string,
    token: string
}

export type PinDataType = {
    _id: string,
    imageUrl: string,
    title: string,
    description?: string,
    tags?: string[],
    author: AuthorType,
    rating: number,
    viewsCount: number
}

export interface PinState {
    items: PinDataType[],
    status: PinStatus,
    isNewPins: boolean,
    isCreated: boolean
}