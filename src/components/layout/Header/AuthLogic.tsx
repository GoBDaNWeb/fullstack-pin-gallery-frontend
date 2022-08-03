// * react 
import {memo} from 'react'
import {Link} from 'react-router-dom'

// * redux
import {useSelector} from 'react-redux'
import {selectAuth, selectAuthData} from '@redux/user/selectors'
import {useAppDispatch} from '@redux/store'
import {logout} from '@redux/user/userSlice'

// * icons/logo
import {BiImageAdd} from 'react-icons/bi'


const AuthLogic = memo(() => {
    const isAuth = useSelector(selectAuth)
    const currentUser = useSelector(selectAuthData)

    const dispatch = useAppDispatch()
    
    return (
        <>
            {
                isAuth
                ? (
                    <div className='flex flex-col mini:flex-row items-center gap-6'>
                        <Link to='/create-pin' className='text-5xl'>
                            <BiImageAdd/>
                        </Link>
                        <Link to={`/profile/${currentUser?._id}`}>
                            {
                                currentUser?.avatarUrl
                                ? (
                                    <img 
                                        src={`${process.env.REACT_APP_API_URL}${currentUser?.avatarUrl}`} 
                                        alt="avatar" 
                                        className='w-10 h-10 rounded-full shadow-md'
                                    />
                                ) : (
                                    <div className='w-10 h-10 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-xl'>
                                        {currentUser?.firstName[0].toUpperCase()}
                                    </div>
                                ) 
                            }
                        </Link>
                        <div 
                            onClick={() => dispatch(logout())}
                            className='cursor-pointer'
                        >
                            Выход
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-6'>
                        <Link to='/auth'>Войти</Link>
                    </div>
                )
            }
        </>
    )
})

export default AuthLogic