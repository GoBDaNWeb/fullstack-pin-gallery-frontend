// * redux
import { selectCurrentPin } from '@redux/pin/selectors';
import { useSelector } from 'react-redux';
import Skeleton from './SkeletonPin';

const PinImg = () => {
    const pin = useSelector(selectCurrentPin);

    return (
        <>
            {pin ? (
                <img
                    src={`${process.env.REACT_APP_API_URL}${pin?.imageUrl}`}
                    alt="Pin"
                    className="max-w-[480px] rounded-lg shadow-md"
                />
            ) : (
                <div className="w-[410px] h-[600px]">
                    <Skeleton />
                </div>
            )}
        </>
    );
};

export default PinImg;
