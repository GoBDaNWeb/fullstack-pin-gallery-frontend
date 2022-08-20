// * redux
import { useSelector } from 'react-redux';
import { selectIsOpenMobileMenu } from '@redux/user/selectors';

// * components
import AuthLogic from './AuthLogic';

const MobileMenu = () => {
    const isOpenMenu = useSelector(selectIsOpenMobileMenu);

    return (
        <div
            className={`fixed flex items-center justify-center transition-all py-4 w-full shadow-md px-10 z-40 bg-white ${
                isOpenMenu ? 'top-20' : 'top-[-10rem]'
            }`}
        >
            <AuthLogic />
        </div>
    );
};

export default MobileMenu;
