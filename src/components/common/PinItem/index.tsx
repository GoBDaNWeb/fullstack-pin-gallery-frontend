// * react
import React, {memo} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IPinItemProps} from './types'

// * icons
import {BsEyeFill} from 'react-icons/bs'

// * components
import UserData from './components/UserData'
import PinFunctional from './components/PinFunctional'


const PinItem: React.FC<IPinItemProps> = memo(({_id, author, description, imageUrl, title, viewsCount}) => {
    const pinParams = {_id, author, description, imageUrl, title, viewsCount}
    const navigation = useNavigate()
    

    const navigateToProfile = (e: React.MouseEvent) => {
        e.preventDefault()
        navigation(`/profile/${author?._id}`)
    }

    return (
        <Link to={`/pin/${_id}`}>
            <div className='max-w-[350px] group relative overflow-hidden cursor-pointer transition-all duration-500 shadow-md my-2 mx-1 rounded-lg '>
                <div className='bg-black bg-opacity-0 group-hover:bg-opacity-25 absolute top-0 bottom-0 right-0 left-0 transition-all duration-500'></div>
                <img src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt='pin' className='bg-gray-200'/>
                <div onClick={navigateToProfile} >
                    <UserData author={author}/>
                </div>
                <div className='flex items-center justify-center text-white text-2xl absolute top-0 left-[-4rem] group-hover:left-2 duration-500 transition-all h-12'>
                    <BsEyeFill/>
                    <span>{viewsCount}</span> 
                </div>
                <PinFunctional {...pinParams} />
            </div>
        </Link>
    )
})

export default PinItem
