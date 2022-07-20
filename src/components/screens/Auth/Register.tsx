// * react
import React, {useState, useRef} from 'react'
import {Link, Navigate} from 'react-router-dom'

// * redux
import {useSelector} from 'react-redux'
import {selectAuth} from '../../../redux/user/selectors'
import {useAddRegisterUserMutation, useAddUploadUserMutation} from '../../../redux/user/userApi'
import { useAppDispatch } from './../../../redux/store';
import { setUser} from './../../../redux/user/userSlice';

// * icons
import {TbArrowBackUp} from 'react-icons/tb'
import {MdPhotoCamera} from 'react-icons/md'


const Register = ({changeAuthHandle}: any) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const inputFileRef = useRef<HTMLInputElement>(null)

    const [userRegister] = useAddRegisterUserMutation()
    const [addUploadUser] = useAddUploadUserMutation()

    const isAuth = useSelector(selectAuth)

    const dispatch = useAppDispatch()

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement> ): Promise<void> => {
		try {
			if (!e.target.files) {
				return
			}
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			const upload = await addUploadUser(formData).unwrap()
			setAvatarUrl(upload.url)
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла')
		}
	}

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'firstName') {
            setFirstName(value)
        }
        if (name === 'lastName') {
            setLastName(value)
        }
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
        if (name === 'confirmPassword') {
            setConfirmPassword(value)
        }
    }

    const handleRegister = async() => {
        try {
            const registerData = {
                firstName,
                lastName,
                email,
                password,
                avatarUrl
            }
			const registerResponse = await userRegister(registerData).unwrap()
			if (!registerResponse) {
				return alert('Не удалось авторизоваться')
			}
            window.localStorage.setItem('token', registerResponse.token)
            dispatch(setUser(registerResponse))
		} catch (err) {
			console.log(err);
		}
    }

    if (isAuth) {
		return <Navigate to='/'/>
	}


    return (
        <div className='p-4 bg-white rounded-xl shadow-md w-96 relative'>
            <Link to='/'>
                <div className='absolute top-2 left-2 text-2xl text-gray-500 cursor-pointer'>
                    <TbArrowBackUp/>
                </div>
            </Link>
            <h4 className='font-semibold text-center text-2xl mb-10'>Зарегестрировать аккаунт</h4>
            <div className='flex flex-col items-center justify-evenly h-full gap-4 mb-10'>
                {
                    avatarUrl
                    ? <img 
                        onClick={() => inputFileRef.current?.click()} 
                        className='w-20 h-20 rounded-full cursor-pointer'
                        src={`${process.env.REACT_APP_API_URL}${avatarUrl}`}
                        alt='Avatar'
                        />
                    : (
                        <div 
                            onClick={() => inputFileRef.current?.click()} 
                            className='bg-gray-200 p-4 rounded-full w-20 h-20 flex justify-center items-center text-4xl text-gray-400 cursor-pointer'
                        >
                            <MdPhotoCamera/>
                        </div>
                    )
                }
                <input 
                    onChange={handleChangeFile} 
                    ref={inputFileRef} 
                    type="file" 
                    hidden 
                />
                <div className='flex gap-2'>
                    <input 
                        onChange={handleChangeValue}
                        type="text" 
                        name='firstName'
                        placeholder='введите имя' 
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full'
                    />
                    <input 
                        onChange={handleChangeValue}
                        type="text" 
                        name='lastName'
                        placeholder='введите фамилию' 
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full' 
                    />
                </div>
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
                    <input 
                        onChange={handleChangeValue}
                        type="password" 
                        placeholder='подтвердите пароль' 
                        name='confirmPassword'
                        className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full' 
                    />
                </div>
                <button 
                    onClick={handleRegister}
                    className='px-4 py-1 bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none'
                    disabled={
                        password !== confirmPassword
                        || !firstName
                        || !lastName
                        || !email
                        || !password
                        || !confirmPassword
                    }
                >
                    зарегестрироваться
                </button>
            </div>
            <h6 
                onClick={changeAuthHandle}
                className='text-center text-sm text-gray-500'
            >
                уже есть аккаунт?
                <span className='cursor-pointer text-sky-500'>
                    войди!
                </span>
            </h6>
        </div>
    )
}

export default Register