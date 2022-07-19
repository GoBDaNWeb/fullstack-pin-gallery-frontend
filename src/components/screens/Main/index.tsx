// * react
import React from 'react'

// * redux 
import {useAppDispatch} from '../../../redux/store'
import {useSelector} from 'react-redux'
import {handleFetchPins} from '../../../redux/pin/pinSlice'
import {selectPins} from '../../../redux/pin/selectors'

// * components 
import Feed from './Feed'

const Main = () => {
    const dispatch = useAppDispatch()
    const {isNewPins} = useSelector(selectPins)

    return (
        <div className='bg-gray-50 min-h-screen px-10 pt-28'>
            <div className='flex items-center justify-center gap-4 pb-6'>
                <button 
                    onClick={() => dispatch(handleFetchPins(true))}
                    className={`text-xl border-[1px] border-solid border-black px-6 pb-1 rounded-full hover:bg-black hover:text-white transition ${isNewPins && 'bg-black text-white'}`}
                >
                    Новые
                </button>
                <button 
                    onClick={() => dispatch(handleFetchPins(false))}
                    className={`text-xl border-[1px] border-solid border-black px-6 pb-1 rounded-full hover:bg-black hover:text-white transition ${!isNewPins && 'bg-black text-white'}`}
                >
                    Популярные
                </button>
            </div>
            <Feed/>
        </div>

    )
}

export default Main