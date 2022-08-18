// * react
import React from 'react'
import {ICurrentUserProps} from '../../types'

// * icons
import {MdPhotoCamera} from 'react-icons/md'


const CurrentUserAvatar: React.FC<ICurrentUserProps> = ({user, inputFileRef, handleUploadImage, handleInputClick}) => {
    return (
        <div className='flex flex-col items-center absolute bottom-[-4rem] right-0 left-0 mx-auto'>
            {
                user?.avatarUrl
                ? (
                    <div className='relative flex items-center justify-center group rounded-full'>
                        <img 
                            src={`${process.env.REACT_APP_API_URL}${user?.avatarUrl}`} 
                            alt="avatar" 
                            className='w-20 h-20 bg-sky-500 rounded-full shadow-md cursor-pointer'
                        />
                        <div 
                            onClick={handleInputClick}
                            className='opacity-0 group-hover:opacity-100 transition absolute w-full h-full bg-black bg-opacity-40 rounded-full text-4xl text-gray-300 flex items-center justify-center cursor-pointer'
                        >
                            <MdPhotoCamera/>
                        </div>
                        <input 
                            onChange={handleUploadImage}
                            ref={inputFileRef} 
                            type="file" 
                            hidden
                        />
                    </div>
                ) : (
                    <div className='w-20 h-20 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl group relative'>
                        {user?.firstName[0].toUpperCase()}
                        <div 
                            onClick={handleInputClick}
                            className='opacity-0 group-hover:opacity-100 transition absolute w-full h-full bg-black bg-opacity-40 rounded-full text-4xl text-gray-300 flex items-center justify-center cursor-pointer'
                        >
                            <MdPhotoCamera/>
                        </div>
                        <input 
                            onChange={handleUploadImage}
                            ref={inputFileRef} 
                            type="file" 
                            hidden
                        />
                    </div>
                )
            }
            <h5 className='font-semibold'>{user?.firstName} {user?.lastName}</h5>   
        </div>
    )
}

export default CurrentUserAvatar