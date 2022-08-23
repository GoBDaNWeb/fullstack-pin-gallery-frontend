// * react
import React, { PropsWithChildren, memo } from 'react';
import { useLocation } from 'react-router-dom';

// * redux
import { useSelector } from 'react-redux';
import { selectAuth, selectIsOpenModal } from '@redux/user/selectors';

// * components
import Header from './Header';
import NonAuthModal from './NonAuthModal';

const Layout: React.FC<PropsWithChildren> = memo(({ children }) => {
    const location = useLocation();
    const isAuth = useSelector(selectAuth);
    const isOpenModal = useSelector(selectIsOpenModal);

    if (isAuth && location.pathname !== '/auth')
        return (
            <>
                <Header />
                {isOpenModal ? <NonAuthModal /> : <></>}
                {children}
            </>
        );

    if (!isAuth && location.pathname !== '/auth')
        return (
            <>
                <Header />
                {isOpenModal ? <NonAuthModal /> : <></>}
                {children}
            </>
        );

    return (
        <>
            {isOpenModal ? <NonAuthModal /> : <></>}
            {children}
        </>
    );
});

export default Layout;
