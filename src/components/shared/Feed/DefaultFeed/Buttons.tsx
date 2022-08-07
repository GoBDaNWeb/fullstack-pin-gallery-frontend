// * redux 
import {useAppDispatch} from '@redux/store'
import {useSelector} from 'react-redux'
import {handleFetchPins} from '@redux/pin/pinSlice'
import {selectPins} from '@redux/pin/selectors'

// *components
import Button from '@components/UI/Button'


const Buttons = () => {
    const dispatch = useAppDispatch()
    const {isNewPins} = useSelector(selectPins)

    const handleFetchNewPins = () => {
        dispatch(handleFetchPins(true))
    }

    const handleFetchPopularPins = () => {
        dispatch(handleFetchPins(false))
    }
    
    return (
        <div className='flex items-center justify-center gap-4 pb-6'>
            <Button 
                content={'Новые'} 
                condition={isNewPins} 
                func={handleFetchNewPins}
            />
            <Button 
                content={'Популярные'} 
                condition={!isNewPins} 
                func={handleFetchPopularPins}
            />
        </div> 
    )
}

export default Buttons