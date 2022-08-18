export interface IFeedProps {
    isMain: boolean
}

export interface IProfileFeedProps {
    isCreated: boolean, 
    setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
}