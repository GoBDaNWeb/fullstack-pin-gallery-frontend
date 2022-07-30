// * redux 
import {selectCurrentPin} from '@redux/pin/selectors'
import {useSelector} from 'react-redux'

// * components 
import PinImg from './PinImg'
import PinContent from './PinContent'
import PinComments from './PinComments'

const PinInfo = () => {
    const pin = useSelector(selectCurrentPin)

    return (
        <div className='flex gap-10 flex-col lg:flex-row'>
            <PinImg pin={pin}/>
            <div className='bg-white w-full p-4 rounded-xl shadow-md flex flex-col items-start justify-start gap-3'>
                <PinContent/>
                <PinComments/>
            </div>
        </div>
    )
}

export default PinInfo