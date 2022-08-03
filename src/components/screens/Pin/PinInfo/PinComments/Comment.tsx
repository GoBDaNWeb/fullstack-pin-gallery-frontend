// * react 
import React, {useState, memo} from 'react'
import {useParams} from 'react-router-dom'
import {IComment} from '../../types'

// * redux 
import {useSelector} from 'react-redux'
import {useGetCommentsQuery, useAddCommentMutation} from '@redux/comment/commentApi'
import {selectAuthData} from '@redux/user/selectors'

// * components 
import UserAvatar from '../UserAvatar'
import Input from '@components/UI/Input'

const Comment = memo(({comment}: {comment: IComment}) => {
    return (
        <div className='flex items-center gap-2'>
            <UserAvatar 
                avatarUrl={comment.author.avatarUrl} 
                firstName={comment.author.firstName}
            />
            <div>
                <div className='flex gap-1 font-semibold'>
                    {comment.author.firstName}
                    {comment.author.lastName}
                </div>
                {comment.text}
            </div>
        </div>
    )
})

export default Comment