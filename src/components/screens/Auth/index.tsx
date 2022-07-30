// * react
import React, { useState} from 'react'

// * components
import Login from './Login/index'
import Register from './Register/index'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    const changeAuthHandle = (): void => {
        setIsLogin(!isLogin)
    }

    return (
        <div className='px-10 bg-gray-50 w-full h-screen flex items-center justify-center'>
            {
                isLogin
                ? <Login changeAuthHandle={changeAuthHandle}/>
                : <Register changeAuthHandle={changeAuthHandle}/>
            }
        </div>
    )
}

export default Auth