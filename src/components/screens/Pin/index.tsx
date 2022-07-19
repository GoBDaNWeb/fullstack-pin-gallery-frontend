// * react 
import React from 'react'

// * redux 
import {useSelector} from 'react-redux'
import {useAppDispatch} from '../../../redux/store'
import {handleFetchPins} from '../../../redux/pin/pinSlice'
import {selectPins} from '../../../redux/pin/selectors'

// *components
import Feed from './Feed'
import PinInfo from './PinInfo'

const Pin = () => {
    const {isNewPins} = useSelector(selectPins)
    const dispatch = useAppDispatch()

    return (
        <div className='bg-gray-50 px-10 py-28 gap-10 flex flex-col'>
            <PinInfo/>
            <div className='flex flex-col items-center w-full'>
                <h5 className='font-semibold text-2xl pb-10'>Больше пинов</h5>
                <div>
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
            </div>
        </div>
    )
}

export default Pin