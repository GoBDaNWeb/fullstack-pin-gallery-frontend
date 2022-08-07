// * react 
import React from 'react'
import {useLocation} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {selectAuth, selectIsOpenModal} from '@redux/user/selectors'

// * components 
import Header from './Header'
import NonAuthModal from './NonAuthModal'

const Layout = ({children}: {children: React.ReactNode}) => {
	const location = useLocation()
	const isAuth = useSelector(selectAuth)
	const isOpenModal = useSelector(selectIsOpenModal)

    return (
        <>
            {
				isAuth && location.pathname !== '/auth'
				? <Header/> :
				!isAuth && location.pathname !== '/auth'
				? <Header/> :
				(<></>)

			}
			{
				isOpenModal
				? <NonAuthModal/>
				: (<></>)
			}
            {children}
        </>
    )
}

export default Layout