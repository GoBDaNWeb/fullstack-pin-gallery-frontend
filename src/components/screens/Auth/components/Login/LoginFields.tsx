// * react
import React, { memo, useState, useCallback } from 'react';

// * redux
import { useAddLoginUserMutation } from '@services/user/userApi';
import { useAppDispatch } from '@redux/store';
import { setUser } from '@redux/user/userSlice';

// * components
import Input from '@components/ui/Input';
import AuthButton from '@components/ui/AuthButton';

const LoginFields = memo(() => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, serError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const dispatch = useAppDispatch();
    const [userLogin] = useAddLoginUserMutation();

    const handleChangeValue = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            const { value } = e.target;
            const { name } = e.target;
            if (name === 'email') {
                setEmail(value);
                setEmailError('');
                serError('');
            }
            if (name === 'password') {
                setPassword(value);
                setPasswordError('');
                serError('');
            }
        },
        [],
    );

    const handleLogin = async (): Promise<void> => {
        try {
            const loginData = {
                email,
                password,
            };
            const loginResponse = await userLogin(loginData).unwrap();
            if (!loginResponse) {
                return alert('Не удалось авторизоваться');
            }
            window.localStorage.setItem('token', loginResponse.token);
            dispatch(setUser(loginResponse));
        } catch (err: any) {
            console.error(err);
            err?.data.message && serError(err?.data.message);
            err?.data[0] && setEmailError(err?.data[0].msg);
            err?.data[1] && setPasswordError(err?.data[1].msg);
        }
    };

    return (
        <div className="flex flex-col items-center justify-evenly h-full gap-4 mb-10">
            <div className="flex flex-col w-full gap-4">
                <Input
                    func={handleChangeValue}
                    type="email"
                    placeholder="введите почту"
                    name="email"
                    error={emailError.length > 0}
                />
                {emailError && (
                    <div className="text-red-500 text-center">{emailError}</div>
                )}
                <Input
                    func={handleChangeValue}
                    type="password"
                    placeholder="введите пароль"
                    name="password"
                    error={passwordError.length > 0}
                />
                {passwordError && (
                    <div className="text-red-500 text-center">
                        {passwordError}
                    </div>
                )}
            </div>
            {error.length > 0 && (
                <div className="text-red-500 text-center">{error}</div>
            )}
            <AuthButton fn={handleLogin} disable={!email || !password}>
                Войти
            </AuthButton>
        </div>
    );
});

export default LoginFields;
