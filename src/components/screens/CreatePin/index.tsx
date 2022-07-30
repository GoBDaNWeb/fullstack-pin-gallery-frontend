// * react
import {useState} from 'react'

// * components 
import CreatePinImg from './CreatePinImg'
import CreatePinFields from './CreatePinFields'

export const CreatePin = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    return (
        <div className='bg-gray-50 min-h-screen px-10 py-28 flex items-center justify-center'>
            <div className='bg-white p-4 shadow-md rounded-2xl flex flex-col items-center justify-center gap-6'>
                <CreatePinImg
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                />
                <CreatePinFields
                    imageUrl={imageUrl}
                />
            </div>
        </div>
    )
}

export default CreatePin