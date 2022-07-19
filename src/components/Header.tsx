// * react 
import {Link} from 'react-router-dom'

// * redux
import {selectAuth, selectAuthData} from '../redux/user/selectors'
import {useAppDispatch} from '../redux/store'
import {useSelector} from 'react-redux'
import {logout} from '../redux/user/userSlice'

// * icons/logo
import logo from '../assets/logo.svg'
import {AiOutlineSearch} from 'react-icons/ai'
import {BiImageAdd} from 'react-icons/bi'

const Header = () => {
    const isAuth = useSelector(selectAuth)
    const currentUser = useSelector(selectAuthData)
    
    const dispatch = useAppDispatch()

    return (
        <div className='flex items-center justify-between fixed h-20 w-full shadow-md px-10 z-50 bg-white'>
            <Link to='/'>
                <img width='86' src={logo} alt="Logo" />
            </Link>
            {/* <label className='flex items-center justify-center w-full'>
                <div className='flex items-center justify-center border-t-[1px] w-10 h-10 border-l-[1px] border-b-[1px] rounded-l-full border-gray-200 bg-gray-100 text-gray-400 text-2xl'>
                    <AiOutlineSearch />
                </div>
                
                <input 
                    type="text" 
                    className='border-solid rounded-r-full h-10 px-2 border-t-[1px] border-r-[1px] border-b-[1px] border-gray-200 bg-gray-100 outline-none w-2/3'
                />
            </label> */}
            {
                isAuth
                ?   (
                    <div className='flex items-center gap-6'>
                        <Link to='/create-pin' className='text-5xl'>
                            <BiImageAdd/>
                        </Link>
                        <Link to={`/profile/${currentUser?._id}`}>
                            {
                                currentUser?.avatarUrl
                                ? <img 
                                    src={`${process.env.REACT_APP_API_URL}${currentUser?.avatarUrl}`} 
                                    alt="avatar" 
                                    className='w-20 h-10 rounded-full shadow-md'
                                />
                                : <div className='w-10 h-10 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-xl'>
                                    {currentUser?.firstName[0].toUpperCase()}
                                </div>
                            }
                        </Link>
                        <div 
                            onClick={() => dispatch(logout())}
                            className='cursor-pointer'
                        >
                            Выход
                        </div>
                    </div>
                )
                : (
                    <div className='flex items-center gap-6'>
                        <Link to='/auth'>Войти</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Header