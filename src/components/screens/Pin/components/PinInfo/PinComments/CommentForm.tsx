// * react 
import React, {useState, memo} from 'react'
import {useParams} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {useGetCommentsQuery, useAddCommentMutation} from '@services/comment/commentApi'
import {selectAuthData} from '@redux/user/selectors'

// * components 
import UserAvatar from '@components/common/UserAvatar'
import Input from '@components/ui/Input'

const CommentForm = () => {
    const [textComment, setTextComment] = useState<string>('')

    const currentUser = useSelector(selectAuthData)
    const {id} = useParams()

    const {refetch: refetchComments} = useGetCommentsQuery(id)

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
        <form 
            onSubmit={addNewComment}
            className='flex items-center justify-center gap-3 absolute bottom-0 w-full'
        >
            <UserAvatar
                avatarUrl={currentUser?.avatarUrl} 
                firstName={currentUser?.firstName}
            />
            <Input
                func={handleChangeValue}
                type={'text'}
                placeholder={'Оставить комментарий'}
                name={'comment'}
                value={textComment}
            />
        </form>
    )
}

export default CommentForm