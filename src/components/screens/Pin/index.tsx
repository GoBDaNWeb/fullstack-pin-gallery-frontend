// * react
import { useParams } from 'react-router-dom';

// * redux
import { useGetOnePinQuery } from '@services/pin/pinApi';

// *components
import Feed from '@components/common/Feed';
import PinInfo from './components/PinInfo';

const Pin = () => {
    const { id } = useParams();
    useGetOnePinQuery(id);

    return (
        <div className="bg-gray-50 px-10 py-28 gap-10 flex flex-col">
            <PinInfo />
            <div className="flex flex-col items-center w-full">
                <h5 className="font-semibold text-2xl pb-10">Больше пинов</h5>
                <Feed isMain />
            </div>
        </div>
    );
};

export default Pin;
