// * react 
import {useParams} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {useGetOnePinQuery} from '@redux/pin/pinApi'
import {useAppDispatch} from '@redux/store'
import {handleFetchPins} from '@redux/pin/pinSlice'
import {selectPins} from '@redux/pin/selectors'

// *components
import Feed from './Feed'
import PinInfo from './PinInfo'
import Button from '@components/UI/Button'

const Pin = () => {
    const {id} = useParams()
    
    const {isNewPins} = useSelector(selectPins)
    const dispatch = useAppDispatch()

    useGetOnePinQuery(id)

    return (
        <div className='bg-gray-50 px-10 py-28 gap-10 flex flex-col'>
            <PinInfo/>
            <div className='flex flex-col items-center w-full'>
                <h5 className='font-semibold text-2xl pb-10'>Больше пинов</h5>
                <>
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
                </>
            </div>
        </div>
    )
}

export default Pin