// * react
import { useState, useCallback } from 'react';

// * components
import Login from './components/Login/index';
import Register from './components/Register/index';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const changeAuthHandle = useCallback((): void => {
        setIsLogin(!isLogin);
    }, [isLogin]);

    return (
        <div className="px-10 bg-gray-50 w-full h-screen flex items-center justify-center">
            {isLogin ? (
                <Login changeAuthHandle={changeAuthHandle} />
            ) : (
                <Register changeAuthHandle={changeAuthHandle} />
            )}
        </div>
    );
};

export default Auth;
