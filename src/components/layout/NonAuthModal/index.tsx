// * react
import React from 'react'
import {useNavigate} from 'react-router-dom'

// * redux 
import {useAppDispatch} from '../../../redux/store'
import {handleOpenModal} from '../../../redux/user/userSlice'

// * icons 
import {AiOutlineClose} from 'react-icons/ai'

const NonAuthModal = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const closeModal = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(handleOpenModal(false))
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
            <div className='w-96 h-96 bg-white rounded-2xl relative p-2 '>
                <div 
                    onClick={closeModal}
                    className='absolute right-2 text-2xl cursor-pointer'
                >
                    <AiOutlineClose/>
                </div>
                <div className='text-center flex flex-col items-center justify-center gap-8 h-full w-full text-3xl'>
                    <h3>Упс...</h3>
                    <h4>Кажется что вы не вошли в свой аккаунт</h4>
                    <div 
                        onClick={(e) => {
                            navigate('/auth')
                            closeModal(e)
                        }} 
                        className='text-sky-500 cursor-pointer'
                    >
                        Войти
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NonAuthModal