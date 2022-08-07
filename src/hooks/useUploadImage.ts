// * react
import React, {useState} from 'react'

interface respose {
	imageUrl: string,
	handleUploadImage: (e: React.ChangeEvent<HTMLInputElement> ) => Promise<void>,
	clearImageUrl: () => void,
	handleInputClick: () => void
}

export function useUploadImage(fn: any, updateFn: any, currentUser: any, inputFileRef?: React.RefObject<HTMLInputElement>): respose  {
    const [imageUrl, setImageUrl] = useState<string>('')

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement> ): Promise<void> => {
		try {
			if (!e.target.files) {
				return
			}
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			const upload = await fn(formData).unwrap()
			setImageUrl(upload.url)
			if (currentUser) {
                updateFn({
                    userId: currentUser._id,
                    avatar: upload.url
                })
            }
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла')
		}
	}

	const clearImageUrl = (): void => {
        setImageUrl('')
    }

	const handleInputClick = (): void => {
        inputFileRef?.current?.click()
    }

	return {imageUrl, handleUploadImage, clearImageUrl, handleInputClick}
}