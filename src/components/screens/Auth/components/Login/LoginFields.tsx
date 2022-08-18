// * react
import React, {memo, useState, useCallback} from 'react'

// * redux
import {useAddLoginUserMutation} from '@services/user/userApi'
import { useAppDispatch } from '@redux/store';
import { setUser} from '@redux/user/userSlice';

// * components 
import Input from '@components/ui/Input'

const LoginFields = memo(() => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useAppDispatch()
    const [userLogin] = useAddLoginUserMutation()

    const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
    }, [])

    const handleLogin = async() => {
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

    return (
        <div className='flex flex-col items-center justify-evenly h-full gap-4 mb-10'>
            <div className='flex flex-col w-full gap-4'>
                <Input
                    func={handleChangeValue}
                    type={'email'}
                    placeholder={'введите почту'}
                    name={'email'}
                />
                <Input
                    func={handleChangeValue}
                    type={'password'}
                    placeholder={'введите пароль'}
                    name={'password'}
                />
            </div>
            <button
                onClick={handleLogin}
                className='px-4 py-1 bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none'
                disabled={!email || !password}
            >
                Войти
            </button>
        </div>
    )
})

export default LoginFields