// * react 
import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {IAuth} from './types'

// * redux 
import {useGetOnePinQuery, useDeletePinMutation} from '../../../redux/pin/pinApi'
import {useGetCommentsQuery, useAddCommentMutation} from '../../../redux/comment/commentApi'
import {useSelector} from 'react-redux'
import {selectAuthData} from '../../../redux/user/selectors'

// * icons 
import {BsEyeFill} from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'


// * components 
import Skeleton from './SkeletonPin'

const UserAvatar = ({avatarUrl, firstName}: {avatarUrl: string | undefined, firstName: string}) => {
    return (
        <>
            {
                avatarUrl
                ? <img 
                    src={`${process.env.REACT_APP_API_URL}${avatarUrl}`} 
                    alt="avatar" 
                    className='w-10 h-10 bg-sky-500 rounded-full shadow-md'
                />
                : (
                    <div className='w-10 h-10 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl'>
                        {firstName[0].toUpperCase()}
                    </div>
                )
            }
        </>
    )
}

const Comments = () => {
    const currentUser = useSelector(selectAuthData)

    const [textComment, setTextComment] = useState<string>('')
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
                        <div className='flex h-full items-center justify-center font-bold text-gray-300 text-4xl'>
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

const PinInfo = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const currentUser = useSelector(selectAuthData)


    const [deletePin] = useDeletePinMutation()
    const {data: pin, refetch: refetchOnePin} = useGetOnePinQuery(id)

    const deletePinFunc = async () => {
        const params = {
            pinId: id
        }
        await deletePin(params)
        navigate('/')
    }

    useEffect(() => {
        refetchOnePin()
        window.scrollTo(0, 0)
    }, [id])

    return (
        <div className='flex gap-10'>
            {
                !pin
                ? (<div className='w-[410px] h-[600px]'>
                        <Skeleton/>
                    </div>)
                : <img 
                    src={`${process.env.REACT_APP_API_URL}${pin?.imageUrl}`} 
                    alt="Pin" 
                    className='max-w-[480px] rounded-lg shadow-md'
                />
            }
            <div className='bg-white w-full p-4 rounded-xl shadow-md flex flex-col items-start justify-start gap-3'>
                <div className='flex flex-col justify-center relative w-full'>
                    <ul className='text-gray-400'>
                        <li className='flex gap-1 items-center'>
                            <BsEyeFill/>
                            <span>{pin?.viewsCount}</span> 
                        </li>
                    </ul>
                    <h3 className='font-semibold text-4xl'>
                        {pin?.title}
                    </h3>
                    <h5>
                        {pin?.description}
                    </h5>
                    <Link 
                        to={`/profile/${pin?.author._id}`}
                        className='pt-4 flex items-center gap-2'
                    >
                        {
                            pin?.author.avatarUrl
                            ? <img 
                                src={`${process.env.REACT_APP_API_URL}${pin?.author.avatarUrl}`} 
                                alt="avatar" 
                                className='w-10 h-10 bg-sky-500 rounded-full shadow-md'
                            />
                            : <div className='w-10 h-10 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl'>
                                {pin?.author.firstName[0].toUpperCase()}
                            </div>
                        }
                        <h5 className='font-semibold'>{pin?.author.firstName} {pin?.author.lastName}</h5> 
                    </Link>
                    {
                        currentUser?._id === pin?.author._id 
                        ? (
                            <div 
                                onClick={deletePinFunc}
                                className='absolute top-0 right-0 text-3xl text-red-600 cursor-pointer'
                            >
                                <AiFillDelete/>
                            </div>
                        ) : ''
                    }
                </div>
                <Comments/>
            </div>
        </div>
    )
}

export default PinInfo