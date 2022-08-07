// * react
import React, {memo} from 'react'
import {IPinItemProps} from '../types'

// * redux
import {useSelector} from 'react-redux'
import {selectAuthData} from '@redux/user/selectors'

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