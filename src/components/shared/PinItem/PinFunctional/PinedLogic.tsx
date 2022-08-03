// * react
import React, {useEffect, useState, memo, useCallback} from 'react'
import {useLocation} from 'react-router-dom'
import {IPinItemProps, IPinedLogicProps} from '../types'

// * redux
import {useSelector} from 'react-redux'
import {useAppDispatch} from '@redux/store'
import {useUpdateUserSavePinMutation, useUpdateUserRemovePinMutation, useLazyGetAuthMeQuery} from '@redux/user/userApi'
import {useLazyGetPinedQuery} from '@redux/pin/pinApi'
import {selectAuthData} from '@redux/user/selectors'
import {handleOpenModal} from '@redux/user/userSlice'

// * icons
import {TbPin, TbPinnedOff} from 'react-icons/tb'

const PinedLogic: React.FC<IPinedLogicProps> = memo(({currentUser, _id, author, description, imageUrl, title, viewsCount}) => {
    const [isPined, setIsPined] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const [fetchCurrentUser] = useLazyGetAuthMeQuery()
    const [fetchPined] = useLazyGetPinedQuery()
    const [userSavePin] = useUpdateUserSavePinMutation()
    const [userRemovePin] = useUpdateUserRemovePinMutation()
    
    const location = useLocation()
    const savePin = useCallback((e: React.MouseEvent) => {
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
    }, [isPined])

    const removePin = useCallback((e: React.MouseEvent) => {
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
    }, [isPined])

    useEffect(() => {
        const filtered = currentUser?.pined?.filter((pin) => pin._id === _id)
        filtered && setIsPined(filtered.length > 0)
    }, [])

    return (
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
})

export default PinedLogic