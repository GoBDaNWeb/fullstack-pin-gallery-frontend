// * components
import Feed from '@components/common/Feed'
import Avatar from './components/Avatar'

const UserProfile = () => {
    return (
        <div>
            <div className='relative'>
                <img 
                    className='h-[500px] w-full object-cover shadow-md'
                    src="https://images.unsplash.com/photo-1656904595885-fad847eef1f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                    alt="user-pic"
                />
                <Avatar/>
            </div>
            <div className='px-10 pt-24'>
                <Feed isMain={false}/> 
            </div>
        </div>
    )
}

export default UserProfile