// * react 
import React, {useState} from 'react'
import {useParams} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {useGetCommentsQuery, useAddCommentMutation} from '@redux/comment/commentApi'
import {selectAuthData} from '@redux/user/selectors'

// * components 
import UserAvatar from './UserAvatar'

const Comments = () => {
    const currentUser = useSelector(selectAuthData)
    const {id} = useParams()

    const [textComment, setTextComment] = useState<string>('')
    const {data: comments, refetch: refetchComments} = useGetCommentsQuery(id)

    const [addComment] = useAddCommentMutation()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const {value} = e.target
        setTextComment(value)
    }

    const addNewComment = (e: React.FormEvent) => {
        e.preventDefault()
        const params = {
            text: textComment,
            id
        }
        addComment(params)
        setTextComment('')
        refetchComments()
    }

    return (
        <div className='w-full h-full relative'>
            <h4 className='text-2xl font-semibold'>Комментарии</h4>
            <div className='w-full h-[370px] overflow-y-scroll'>
                {
                    comments && comments.length > 0
                    ? (
                        <div className='flex flex-col justify-start gap-4 w-full h-full'>
                            {
                                comments.map((comment, index) => (
                                    <div key={index} className='flex items-center gap-2'>
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
                                ))
                            }
                        </div>
                    ) : (
                        <div className='flex h-full items-center justify-center font-bold text-gray-300 text:2xl lg:text-4xl'>
                            Комментариев нет
                        </div>
                    )
                }
            </div>
            {
                currentUser
                && (
                    <form 
                        onSubmit={addNewComment}
                        className='flex items-center justify-center gap-3 absolute bottom-0 w-full'
                    >
                        <UserAvatar
                            avatarUrl={currentUser.avatarUrl} 
                            firstName={currentUser.firstName}
                        />
                        <input 
                            onChange={handleChangeValue}
                            type="text" 
                            value={textComment}
                            placeholder='Оставить комментарий'
                            className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-2/3'
                        />
                    </form>
                )
            }
        </div>
    )
}

export default Comments