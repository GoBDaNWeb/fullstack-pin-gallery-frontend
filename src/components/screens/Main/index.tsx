// * react
import React from 'react'

// * redux 
import {useAppDispatch} from '@redux/store'
import {useSelector} from 'react-redux'
import {handleFetchPins} from '@redux/pin/pinSlice'
import {selectPins} from '@redux/pin/selectors'

// * components 
import Feed from './Feed'
import Button from '@components/UI/Button'

const Main = () => {
    const dispatch = useAppDispatch()
    const {isNewPins} = useSelector(selectPins)

    return (
        <div className='bg-gray-50 min-h-screen px-10 pt-28'>
            <div className='flex items-center justify-center gap-4 pb-6'>
                <Button 
                    content={'Новые'} 
                    condition={isNewPins} 
                    func={() => dispatch(handleFetchPins(true))}
                />
                <Button 
                    content={'Популярные'} 
                    condition={!isNewPins} 
                    func={() => dispatch(handleFetchPins(false))}
                />
            </div>
            <Feed/>
        </div>

    )
}

export default Main