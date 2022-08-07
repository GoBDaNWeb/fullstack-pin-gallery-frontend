// * react 
import {IProfileFeedProps} from '../types'

// *components
import Button from '@components/UI/Button'

const Buttons: React.FC<IProfileFeedProps> = ({isCreated, setIsCreated}) => {
    const handleFetchCreatedPins = () => {
        setIsCreated(true)
    }

    const handleFetchSavedPins = () => {
        setIsCreated(false)
    }
    
    return (
        <div className='flex items-center justify-center gap-4 pb-6'>
            <Button 
                content={'Созданные'} 
                condition={isCreated} 
                func={handleFetchCreatedPins}
            />
            <Button 
                content={'Сохраненные'} 
                condition={!isCreated} 
                func={handleFetchSavedPins}
            />
        </div> 
    )
}

export default Buttons