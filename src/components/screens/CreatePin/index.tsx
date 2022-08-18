// * react
import {useRef} from 'react'
import { Navigate } from 'react-router-dom'

// * redux
import {useSelector} from 'react-redux'
import {useAddUploadPinMutation} from '@services/pin/pinApi'
import {selectAuth} from '@redux/user/selectors'

// * hooks 
import {useUploadImage} from '@hooks/useUploadImage'

// * components 
import CreatePinImg from './components/CreatePinImg'
import CreatePinFields from './components/CreatePinFields'

export const CreatePin = () => {
    const [uploadPin] = useAddUploadPinMutation()
    const isAuth = useSelector(selectAuth)
    const inputFileRef = useRef<HTMLInputElement>(null)
    const {imageUrl, handleUploadImage, clearImageUrl} = useUploadImage(uploadPin, undefined, undefined, inputFileRef)

    if (!isAuth) {
        return <Navigate to='/'/>
    }

    return (
        <div className='bg-gray-50 min-h-screen px-10 py-28 flex items-center justify-center'>
            <div className='bg-white p-4 shadow-md rounded-2xl flex flex-col items-center justify-center gap-6'>
                <CreatePinImg
                    pinImage={imageUrl}
                    handleUploadImage={handleUploadImage}
                    clearImageUrl={clearImageUrl}
                />
                <CreatePinFields
                    pinImage={imageUrl}
                />
            </div>
        </div>
    )
}

export default CreatePin