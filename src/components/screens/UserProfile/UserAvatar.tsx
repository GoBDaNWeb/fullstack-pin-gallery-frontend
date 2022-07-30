import React, {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'

// * redux
import {useSelector} from 'react-redux'
import {selectAuthData} from '@redux/user/selectors'
import {
    useUpdateUserAvatarMutation, 
    useGetUserQuery, 
    useLazyGetAuthMeQuery, 
    useAddUploadUserMutation
} from '@redux/user/userApi'

// * icons
import {MdPhotoCamera} from 'react-icons/md'


const UserAvatar = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>()

    const inputFileRef = useRef<HTMLInputElement>(null)

    const {id} = useParams()

    const currentUser = useSelector(selectAuthData)

    const [updateUserAvatar] = useUpdateUserAvatarMutation()
    const [addUploadUser] = useAddUploadUserMutation()
    const {data: user, refetch: refetchUser} = useGetUserQuery(id)
    const [fetchCurrentUser] = useLazyGetAuthMeQuery()

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement> ): Promise<void> => {
		try {
			if (!e.target.files) {
				return
			}
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
            const data = await addUploadUser(formData).unwrap()
			setAvatarUrl(data.url)
            if (currentUser) {
                updateUserAvatar({
                    userId: currentUser._id,
                    avatar: data.url
                })
            }
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла')
		}
	}

    
    useEffect(() => {
        refetchUser()
        fetchCurrentUser()
    }, [id, avatarUrl])

    return (
        <>
            {
                currentUser?._id === id
                ? (
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
                                        onClick={() => inputFileRef.current?.click()}
                                        className='opacity-0 group-hover:opacity-100 transition absolute w-full h-full bg-black bg-opacity-40 rounded-full text-4xl text-gray-300 flex items-center justify-center cursor-pointer'
                                    >
                                        <MdPhotoCamera/>
                                    </div>
                                    <input 
                                        onChange={handleChangeFile}
                                        ref={inputFileRef} 
                                        type="file" 
                                        hidden
                                    />
                                </div>
                            ) : (
                                <div className='w-20 h-20 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl group relative'>
                                    {user?.firstName[0].toUpperCase()}
                                    <div 
                                        onClick={() => inputFileRef.current?.click()}
                                        className='opacity-0 group-hover:opacity-100 transition absolute w-full h-full bg-black bg-opacity-40 rounded-full text-4xl text-gray-300 flex items-center justify-center cursor-pointer'
                                    >
                                        <MdPhotoCamera/>
                                    </div>
                                    <input 
                                        onChange={handleChangeFile}
                                        ref={inputFileRef} 
                                        type="file" 
                                        hidden
                                    />
                                </div>
                            )
                        }
                        <h5 className='font-semibold'>{user?.firstName} {user?.lastName}</h5>   
                    </div>
                ) : (
                    <div className='flex flex-col items-center absolute bottom-[-4rem] right-0 left-0 mx-auto'>
                        {
                            user?.avatarUrl
                            ? <img 
                                src={`${process.env.REACT_APP_API_URL}${user?.avatarUrl}`} 
                                alt="avatar" 
                                className='w-20 h-20 bg-sky-500 rounded-full shadow-md'
                            />
                            : <div className='w-20 h-20 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl'>
                                {user?.firstName[0].toUpperCase()}
                            </div>
                        }
                        <h5 className='font-semibold'>{user?.firstName} {user?.lastName}</h5>   
                    </div>
                ) 
            }
        </>
    )
}

export default UserAvatar