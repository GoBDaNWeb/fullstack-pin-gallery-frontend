// * react
import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'

// * redux
import {useAddLoginUserMutation} from '../../../redux/user/userApi'
import {selectAuth} from '../../../redux/user/selectors'
import {useSelector} from 'react-redux'
import { useAppDispatch } from './../../../redux/store';
import { setUser} from './../../../redux/user/userSlice';


// * icons
import {TbArrowBackUp} from 'react-icons/tb'

const Login = ({changeAuthHandle}: {changeAuthHandle: () => void}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const isAuth = useSelector(selectAuth)

    const [userLogin] = useAddLoginUserMutation()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }

    const handleRegister = async() => {
        try {
            const loginData = {
                email,
                password
            }
            const loginResponse = await userLogin(loginData).unwrap()
			if (!loginResponse) {
				return alert('Не удалось авторизоваться')
			}
            window.localStorage.setItem('token', loginResponse.token)
            dispatch(setUser(loginResponse))
		} catch (err) {
			console.log(err);
		}
    } 

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
            <div className='flex flex-col items-center justify-evenly h-full gap-4 mb-10'>
                <div className='flex flex-col w-full gap-4'>
                    <input 
                        onChange={handleChangeValue}
                        type="email" 
                        placeholder='введите почту' 
                        name='email'
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full'
                    />
                    <input 
                        onChange={handleChangeValue}
                        type="password" 
                        placeholder='введите пароль' 
                        name='password'
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full' 
                    />
                </div>
                <button
                    onClick={handleRegister}
                    className='px-4 py-1 bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none'
                    disabled={!email || !password}
                >
                    Войти
                </button>
            </div>
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
}

export default Login