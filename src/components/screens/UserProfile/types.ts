export interface IProfileFeedProps {
    isCreated: boolean
}
export interface ICurrentUserProps {
    user?: IAuthor, 
    inputFileRef: React.RefObject<HTMLInputElement>,
    handleUploadImage: (e: React.ChangeEvent<HTMLInputElement> ) => Promise<void>,
    handleInputClick: () => void
}

export interface IAuthor {
    _id: string,
	firstName: string,
	lastName: string,
	email: string,
	avatarUrl?: string,
	createdAt: string,
	updatedAt: string,
	__v?: number,
	pined: IPin[],
	token: string,
}

export interface IPin {
    title: string,
    imageUrl: string,
    description?: string,
    author: string,
    viewsCount: number,
    _id: string
}