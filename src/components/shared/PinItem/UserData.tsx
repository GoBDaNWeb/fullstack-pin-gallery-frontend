// * react 
import React from 'react'
import {IAuthor} from './types'

const UserData = ({author}: {author: IAuthor}) => {
    return (
        <div className='flex items-center gap-2 bottom-[-4rem] rounded-tr-2xl absolute opacity-0 p-3 group-hover:bottom-0 group-hover:opacity-100 duration-500 transition-all'>
            {
                author?.avatarUrl
                ? ( <img 
                        className='w-12 h-12 rounded-full' 
                        src={`${process.env.REACT_APP_API_URL}${author?.avatarUrl}`} 
                        alt="avatar" 
                    />
                ) : (
                    <div className='flex items-center justify-center font-bold text-white text-xl w-12 h-12 bg-cyan-500 rounded-full'>
                        {author?.firstName[0].toUpperCase()}
                    </div>
                )
            }
            <h4 className='font-semibold text-white'>
                {author?.firstName} {author?.lastName}
            </h4>
        </div>
    )
}

export default UserData