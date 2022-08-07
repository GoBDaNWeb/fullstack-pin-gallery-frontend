// * react 
import {memo, useState, useCallback} from 'react'

// * components
import Login from './Login/index'
import Register from './Register/index'

const Auth = memo(() => {
    const [isLogin, setIsLogin] = useState(true)

    const changeAuthHandle = useCallback((): void => {
        setIsLogin(!isLogin)
    }, [isLogin])

    return (
        <div className='px-10 bg-gray-50 w-full h-screen flex items-center justify-center'>
            {
                isLogin
                ? <Login changeAuthHandle={changeAuthHandle}/>
                : <Register changeAuthHandle={changeAuthHandle}/>
            }
        </div>
    )
})

export default Auth