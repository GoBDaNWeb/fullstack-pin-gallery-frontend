// * react
import React, {useEffect, useState, memo} from 'react'
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

// * components 
import PinedLogic from './PinedLogic'

const PinFunctional: React.FC<IPinItemProps> = memo(({_id, author, description, imageUrl, title, viewsCount}) => {
    const currentUser = useSelector(selectAuthData)
    return (
        <>
            {
                currentUser?._id !== author._id 
                && (
                    <PinedLogic 
                        currentUser={currentUser}
                        _id={_id}
                        author={author}
                        description={description}
                        imageUrl={imageUrl}
                        title={title}
                        viewsCount={viewsCount}
                    />
                ) 
            }
        </>
    )
})

export default PinFunctional