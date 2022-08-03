const UserAvatar = ({avatarUrl, firstName}: {avatarUrl?: string | undefined, firstName?: string}) => {
    return (
        <>
            {
                avatarUrl
                ? <img 
                    src={`${process.env.REACT_APP_API_URL}${avatarUrl}`} 
                    alt="avatsar" 
                    className='w-10 h-10 bg-sky-500 rounded-full shadow-md'
                />
                : (
                    <div className='w-10 h-10 bg-sky-500 rounded-full shadow-md flex items-center justify-center text-white font-semibold text-3xl'>
                        {firstName && firstName[0].toUpperCase()}
                    </div>
                )
            }
        </>
    )
}

export default UserAvatar