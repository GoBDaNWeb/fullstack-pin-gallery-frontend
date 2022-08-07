// * react
import React, {memo, useState, useRef, useCallback} from 'react'

// * redux
import {useAddRegisterUserMutation, useAddUploadUserMutation} from '@services/user/userApi'
import { useAppDispatch } from '@redux/store';
import { setUser} from '@redux/user/userSlice';

// * hooks 
import {useUploadImage} from '../../../../hooks/useUploadImage'

// * icons
import {MdPhotoCamera} from 'react-icons/md'

// * components 
import Input from '@components/UI/Input'

const RegisterFields = memo(() => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const inputFileRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()
    const [userRegister] = useAddRegisterUserMutation()
    const [addUploadUser] = useAddUploadUserMutation()

    const {imageUrl: avatar, handleUploadImage} = useUploadImage(addUploadUser, undefined, undefined,undefined)


    const disabledCondition = password !== confirmPassword || !firstName || !lastName || !email || !password || !confirmPassword

    const handleInputClick = (): void => {
        inputFileRef.current?.click()
    }

    const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
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
    }, [])

    const handleRegister = async(): Promise<void> => {
        try {
            const registerData = {
                firstName,
                lastName,
                email,
                password,
                avatar
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
    return (
        <div className='flex flex-col items-center justify-evenly h-full gap-4 mb-10'>
            {
                avatar
                ? <img 
                    onClick={handleInputClick} 
                    className='w-20 h-20 rounded-full cursor-pointer'
                    src={`${process.env.REACT_APP_API_URL}${avatar}`}
                    alt='Avatar'
                    />
                : (
                    <div 
                        onClick={handleInputClick} 
                        className='bg-gray-200 p-4 rounded-full w-20 h-20 flex justify-center items-center text-4xl text-gray-400 cursor-pointer'
                    >
                        <MdPhotoCamera/>
                    </div>
                )
            }
            <input 
                onChange={handleUploadImage} 
                ref={inputFileRef} 
                type="file" 
                hidden 
            />
            <div className='flex gap-2'>
                <Input
                    func={handleChangeValue}
                    type={'text'}
                    placeholder={'введите имя'}
                    name={'firstName'}
                />
                <Input
                    func={handleChangeValue}
                    type={'text'}
                    placeholder={'введите фамилию'}
                    name={'lastName'}
                />
            </div>
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
                <Input
                    func={handleChangeValue}
                    type={'password'}
                    placeholder={'подтвердите пароль'}
                    name={'confirmPassword'}
                />
                
            </div>
            <button 
                onClick={handleRegister}
                className='px-4 py-1 bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none'
                disabled={disabledCondition}
            >
                зарегестрироваться
            </button>
        </div>
    )
})

export default RegisterFields