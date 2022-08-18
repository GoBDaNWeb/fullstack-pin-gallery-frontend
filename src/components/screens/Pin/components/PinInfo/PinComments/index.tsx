// * react 
import React, {useState, memo} from 'react'
import {useParams} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {useGetCommentsQuery, useAddCommentMutation} from '@services/comment/commentApi'
import {selectAuthData} from '@redux/user/selectors'

// * components 
import CommentForm from './CommentForm'
import Comment from './Comment'

const Comments = () => {
    const [textComment, setTextComment] = useState<string>('')

    const currentUser = useSelector(selectAuthData)
    const {id} = useParams()

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
                                comments?.map((comment, index) => <Comment key={index} comment={comment}/>)
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
                && <CommentForm/>
            }
        </div>
    )
}

export default Comments