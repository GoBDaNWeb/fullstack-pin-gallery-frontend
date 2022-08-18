// * react
import {memo} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {ILoginProps} from '../../types'

// * redux 
import {useSelector} from 'react-redux'
import {selectAuth} from '@redux/user/selectors'

// * icons
import {TbArrowBackUp} from 'react-icons/tb'

// * components 
import LoginFields from './LoginFields'

const Login: React.FC<ILoginProps> = memo(({changeAuthHandle}) => {
    const isAuth = useSelector(selectAuth)

    if (isAuth) {
		return <Navigate to='/'/>
	}

    return (
        <div className='p-4 bg-white rounded-xl shadow-md w-80 relative'>
            <Link to='/'>
                <div className='absolute top-2 left-2 text-2xl text-gray-500 cursor-pointer'>
                    <TbArrowBackUp/>
                </div>
            </Link>
            <h4 className='font-semibold text-center text-2xl mb-10'>Войти в аккаунт</h4>
            <LoginFields/>
            <h6 
                onClick={changeAuthHandle} 
                className='text-center text-sm text-gray-500'
            >
                    нет аккаунта?
                <span className='cursor-pointer text-sky-500'>
                    зарегестрируй!
                </span>
            </h6>
        </div>
    )
})

export default Login