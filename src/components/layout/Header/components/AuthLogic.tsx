// * react
import { memo } from 'react';
import { Link } from 'react-router-dom';

// * redux
import { useSelector } from 'react-redux';
import { selectAuth, selectAuthData } from '@redux/user/selectors';
import { useAppDispatch } from '@redux/store';
import { logout } from '@redux/user/userSlice';

// * icons/logo
import { BiImageAdd } from 'react-icons/bi';

// * components
import UserAvatar from '@components/common/UserAvatar';

const AuthLogic = memo(() => {
    const isAuth = useSelector(selectAuth);
    const currentUser = useSelector(selectAuthData);

    const dispatch = useAppDispatch();

    const handleLogout = (): void => {
        dispatch(logout());
    };

    return (
        <>
            {isAuth ? (
                <div className="flex flex-col mini:flex-row items-center gap-6">
                    <Link to="/create-pin" className="text-5xl">
                        <BiImageAdd />
                    </Link>
                    <Link to={`/profile/${currentUser?._id}`}>
                        <UserAvatar
                            avatarUrl={currentUser?.avatarUrl}
                            firstName={currentUser?.firstName}
                        />
                    </Link>
                    <div onClick={handleLogout} className="cursor-pointer">
                        Выход
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-6">
                    <Link to="/auth">Войти</Link>
                </div>
            )}
        </>
    );
});

export default AuthLogic;
