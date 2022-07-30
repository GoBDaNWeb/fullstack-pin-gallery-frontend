// * react
import React, {useRef} from 'react'

// * redux
import {useAddUploadPinMutation} from '@redux/pin/pinApi'

// * icons
import {MdPhotoCamera} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'


const CreatePinImg = ({imageUrl, setImageUrl}: {imageUrl: string, setImageUrl: React.Dispatch<React.SetStateAction<string>>}) => {
    const [addUploadPin] = useAddUploadPinMutation()

    const inputFileRef = useRef<HTMLInputElement>(null)

    const clearImageUrl = () => {
        setImageUrl('')
    }

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement> ): Promise<void> => {
		try {
			if (!e.target.files) {
				return
			}
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
            const upload = await addUploadPin(formData).unwrap()
			setImageUrl(upload.url)
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла')
		}
	}

    return (
        <>
            <div className='relative w-full h-full'>
                {
                    imageUrl 
                    ? <img 
                        className='max-w-[320px] max-h-[400px] shadow-md rounded-2xl' 
                        src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                        alt='pin-image'
                        />
                    : (
                        <div 
                            onClick={() => inputFileRef.current?.click()}
                            className='w-80 h-96 bg-white rounded-2xl shadow-lg border-[1px] border-gray-100 border-solid text-8xl text-gray-300 flex items-center justify-center cursor-pointer'
                        >
                            <MdPhotoCamera/>
                        </div>
                    )
                }
                {
                    imageUrl 
                    && (
                        <div 
                            onClick={clearImageUrl}
                            className='flex items-center justify-center text-3xl absolute w-12 h-12 rounded-full shadow-md border-[1px] border-solid border-gray-100 bg-white top-[-.5rem] right-[-.5rem] cursor-pointer'
                        >
                            <AiOutlineClose/>
                        </div>
                    )
                }
            </div>
            <input
                onChange={handleChangeFile}
                ref={inputFileRef} 
                type="file" 
                hidden
            />
        </>
    )
}

export default CreatePinImg