// * react 
import {IAuthor} from '../types'

// * components 
import UserAvatar from '@components/common/UserAvatar'

const UserData = ({author}: {author: IAuthor}) => {
    const {avatarUrl, firstName, lastName} = author

    return (
        <div className='flex items-center gap-2 bottom-[-4rem] rounded-tr-2xl absolute opacity-0 p-3 group-hover:bottom-0 group-hover:opacity-100 duration-500 transition-all'>
            <UserAvatar
                avatarUrl={avatarUrl}
                firstName={firstName}
            />
            <h4 className='font-semibold text-white'>
                {firstName} {lastName}
            </h4>
        </div>
    )
}

export default UserData