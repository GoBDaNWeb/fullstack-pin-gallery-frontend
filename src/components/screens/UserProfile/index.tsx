// * react 

import React, {useState} from 'react'

// * components
import Feed from './Feed'
import UserAvatar from './UserAvatar'
import Button from '../../UI/Button'

const UserProfile = () => {
    const [isCreated, setIsCreated] = useState<boolean>(true)

    return (
        <div>
            <div className='relative'>
                <img 
                    className='h-[500px] w-full object-cover shadow-md'
                    src="https://images.unsplash.com/photo-1656904595885-fad847eef1f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                    alt="user-pic"
                />
                <UserAvatar/>
            </div>
            <div className='px-10 pt-24'>
                <div className='flex justify-center items-center gap-6 pb-8'>
                    <Button 
                        content={'созданные'} 
                        condition={isCreated} 
                        func={() => setIsCreated(true)}
                    />
                    <Button 
                        content={'сохраненные'} 
                        condition={!isCreated} 
                        func={() => setIsCreated(false)}
                    />
                </div>
                <Feed 
                    isCreated={isCreated} 
            /> 
            </div>
        </div>
    )
}

export default UserProfile