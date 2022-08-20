// * react
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// * redux
import { useSelector } from 'react-redux';
import {
    useLazyGetOnePinQuery,
    useDeletePinMutation,
} from '@services/pin/pinApi';
import { selectAuthData } from '@redux/user/selectors';
import { selectCurrentPin } from '@redux/pin/selectors';

// * icons
import { BsEyeFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

// * components
import UserAvatar from '@components/common/UserAvatar';

const PinContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const pin = useSelector(selectCurrentPin);

    const [deletePin] = useDeletePinMutation();
    const [fetchPin] = useLazyGetOnePinQuery();

    const currentUser = useSelector(selectAuthData);
    const deletePinFunc = async () => {
        const params = {
            pinId: id,
        };
        await deletePin(params);
        navigate('/');
    };

    useEffect(() => {
        fetchPin(id);
        window.scrollTo(0, 0);
    }, [fetchPin, id]);

    return (
        <div className="flex flex-col justify-center relative w-full">
            <ul className="text-gray-400">
                <li className="flex gap-1 items-center">
                    <BsEyeFill />
                    <span>{pin?.viewsCount}</span>
                </li>
            </ul>
            <h3 className="font-semibold text-4xl">{pin?.title}</h3>
            <h5>{pin?.description}</h5>
            <Link
                to={`/profile/${pin?.author._id}`}
                className="pt-4 flex items-center gap-2"
            >
                <UserAvatar
                    avatarUrl={pin?.author.avatarUrl}
                    firstName={pin?.author.firstName || 'avatar'}
                />
                <h5 className="font-semibold">
                    {pin?.author.firstName} {pin?.author.lastName}
                </h5>
            </Link>
            {currentUser?._id === pin?.author._id && (
                <button
                    onClick={deletePinFunc}
                    className="absolute top-0 right-0 text-3xl text-red-600 cursor-pointer"
                >
                    <AiFillDelete />
                </button>
            )}
        </div>
    );
};

export default PinContent;
