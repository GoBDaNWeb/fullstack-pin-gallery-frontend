// * react 
import React, {memo} from 'react'
import {ICommentProps} from '../../types'

// * components 
import UserAvatar from '@components/shared/UserAvatar'

const Comment: React.FC<ICommentProps> = memo(({comment}) => {
    const {text} = comment
    const {avatarUrl, firstName, lastName} = comment.author

    return (
        <div className='flex items-center gap-2'>
            <UserAvatar 
                avatarUrl={avatarUrl} 
                firstName={firstName}
            />
            <div>
                <div className='flex gap-1 font-semibold'>
                    {firstName}
                    {lastName}
                </div>
                {text}
            </div>
        </div>
    )
})

export default Comment