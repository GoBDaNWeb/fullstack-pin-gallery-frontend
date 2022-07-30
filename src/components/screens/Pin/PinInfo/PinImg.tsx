// * components 
import Skeleton from '../SkeletonPin'
import {IPin} from '../types'

const PinImg = ({pin}: {pin: IPin | null}) => {
    return (
        <>
            {
                !pin
                ? (<div className='w-[410px] h-[600px]'>
                        <Skeleton/>
                    </div>)
                : <img 
                    src={`${process.env.REACT_APP_API_URL}${pin?.imageUrl}`} 
                    alt="Pin" 
                    className='max-w-[480px] rounded-lg shadow-md'
                />
            }
        </>
    )
}

export default PinImg