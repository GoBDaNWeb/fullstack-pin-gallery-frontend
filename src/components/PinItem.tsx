// * react
import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {IAuthor, IPinItemProps} from './types'

// * redux
import {useAppDispatch} from '../redux/store'
import {useUpdateUserSavePinMutation, useUpdateUserRemovePinMutation, useLazyGetAuthMeQuery} from '../redux/user/userApi'
import {useLazyGetPinedQuery} from '../redux/pin/pinApi'
import {useSelector} from 'react-redux'
import {selectAuthData} from '../redux/user/selectors'
import {handleOpenModal} from '../redux/user/userSlice'

// * icons
import {TbPin, TbPinnedOff} from 'react-icons/tb'
import {BsEyeFill} from 'react-icons/bs'

const PinFunctional: React.FC<IPinItemProps> = ({_id, author, description, imageUrl, title, viewsCount}) => {
    const [isPined, setIsPined] = useState<boolean>(false)

    const location = useLocation()

    const currentUser = useSelector(selectAuthData)

    const dispatch = useAppDispatch()

    const [fetchCurrentUser] = useLazyGetAuthMeQuery()
    const [fetchPined] = useLazyGetPinedQuery()
    const [userSavePin] = useUpdateUserSavePinMutation()
    const [userRemovePin] = useUpdateUserRemovePinMutation()
    
    const savePin = (e: React.MouseEvent) => {
        e.preventDefault()
        if (currentUser) {
            const savedPin = {
                _id,
                title,
                description,
                imageUrl,
                author: author._id,
                userId: currentUser?._id,
                viewsCount
            }
            userSavePin(savedPin)
            fetchPined(currentUser._id)
            fetchCurrentUser()
            setIsPined(true)
        } else {
            dispatch(handleOpenModal(true))
        }
    }

    const removePin = (e: React.MouseEvent) => {
        e.preventDefault()
        if (currentUser) {
            const removedPin = {
                pinId: _id,
                userId: currentUser?._id
            }
            userRemovePin(removedPin)
            fetchPined(currentUser._id)
            fetchCurrentUser()
            setIsPined(false)
        }
    }
    useEffect(() => {
        const filtered = currentUser?.pined.filter((pin) => pin._id === _id)

        filtered && setIsPined(filtered.length > 0)
    }, [])

    return (
        <>
            {
                currentUser?._id === author._id 
                ? (<></>)
                : (
                    <>
                        {
                            location.pathname === `/profile/${currentUser?._id}` || isPined
                            ? (
                                <div 
                                    onClick={removePin}
                                    className='flex items-center justify-center text-white text-3xl absolute top-[-4rem] right-[-4rem] group-hover:right-[-.3rem] group-hover:top-[-.3rem] duration-500 transition-all w-12 h-12'
                                >
                                    <TbPinnedOff/>
                                </div>
                            ) : (
                                <div 
                                    onClick={savePin}
                                    className='flex items-center justify-center text-white text-3xl absolute top-[-4rem] right-[-4rem] group-hover:right-[-.3rem] group-hover:top-[-.3rem] duration-500 transition-all w-12 h-12'
                                >
                                    <TbPin/>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

const UserData = ({author}: {author: IAuthor}) => {
    return (
        <div className='flex items-center gap-2 bottom-[-4rem] rounded-tr-2xl absolute opacity-0 p-3 group-hover:bottom-0 group-hover:opacity-100 duration-500 transition-all'>
            {
                author?.avatarUrl
                ? ( <img 
                        className='w-12 h-12 rounded-full' 
                        src={`${process.env.REACT_APP_API_URL}${author?.avatarUrl}`} 
                        alt="avatar" 
                    />
                ) : (
                    <div className='flex items-center justify-center font-bold text-white text-xl w-12 h-12 bg-cyan-500 rounded-full'>
                        {author?.firstName[0].toUpperCase()}
                    </div>
                )
            }
            <h4 className='font-semibold text-white'>
                {author?.firstName} {author?.lastName}
            </h4>
        </div>
    )
}

const PinItem: React.FC<IPinItemProps> = ({_id, author, description, imageUrl, title, viewsCount}) => {
    const pinParams = {_id, author, description, imageUrl, title, viewsCount}
    const navigation = useNavigate()
    

    const navigateToProfile = (e: React.MouseEvent) => {
        e.preventDefault()
        navigation(`/profile/${author?._id}`)
    }

    return (
        <Link to={`/pin/${_id}`}>
            <div className='max-w-[350px] group relative overflow-hidden cursor-pointer transition-all duration-500 shadow-md my-2 mx-1 rounded-lg '>
                <div className='bg-black bg-opacity-0 group-hover:bg-opacity-25 absolute top-0 bottom-0 right-0 left-0 transition-all duration-500'></div>
                <img src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt='pin'/>
                <div onClick={navigateToProfile} >
                    <UserData author={author}/>
                </div>
                <div className='flex items-center justify-center text-white text-2xl absolute top-0 left-[-4rem] group-hover:left-2 duration-500 transition-all h-12'>
                    <BsEyeFill/>
                    <span>{viewsCount}</span> 
                </div>
                <PinFunctional {...pinParams} />
            </div>
        </Link>
    )
}

export default PinItem
