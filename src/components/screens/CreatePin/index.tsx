// * react
import React, {useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'

// * redux
import {useAddPinMutation, useAddUploadPinMutation} from '../../../redux/pin/pinApi'

// * components
import {MdPhotoCamera} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'

export const CreatePin = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const [addPin] = useAddPinMutation()
    const [addUploadPin] = useAddUploadPinMutation()

    const navigate = useNavigate()

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

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'title') {
            setTitle(value)
        }
        if (name === 'description') {
            setDescription(value)
        }
    }

    const createPin = async () => {
        const pinParams = {
            imageUrl,
            title,
            description,
        }
        const data = await addPin(pinParams).unwrap()
        navigate(`/pin/${data?._id}`)
    }

    return (
        <div className='bg-gray-50 min-h-screen px-10 py-28 flex items-center justify-center'>
            <div className='bg-white p-4 shadow-md rounded-2xl flex flex-col items-center justify-center gap-6'>
                <div>
                    <div className='relative w-full h-full'>
                        {
                            imageUrl 
                            ? <img className='max-w-[320px] max-h-[400px] shadow-md rounded-2xl' src={`http://localhost:7777${imageUrl}`}/>
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
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <input 
                        onChange={handleChangeValue}
                        type="text" 
                        placeholder='название'
                        name='title'
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full' 
                    />
                    <input 
                        onChange={handleChangeValue}
                        type="text" 
                        placeholder='описание'
                        name='description'
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full' 
                    />
                </div>
                <button
                    onClick={createPin}
                    className='hover:bg-black hover:bg-opacity-90 hover:text-white px-4 pb-1 rounded-full border-[1px] border-solid border-black transition'
                >
                    создать
                </button>
            </div>
        </div>
    )
}

export default CreatePin