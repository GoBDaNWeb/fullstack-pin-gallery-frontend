// * react 
import React, { PropsWithChildren } from 'react'
import {IAuthButton} from './types'

const AuthButton: React.FC<PropsWithChildren<IAuthButton>> = ({fn, disable, children}) => {
    return (
        <button
            onClick={() => fn()}
            className='px-4 py-1 bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none'
            disabled={disable}
        >
            {children}
        </button>
    )
}

export default AuthButton