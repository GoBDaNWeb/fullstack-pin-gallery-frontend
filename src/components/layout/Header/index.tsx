// * react 
import {memo} from 'react'
import {Link} from 'react-router-dom'

// * redux
import {useSelector} from 'react-redux'
import {selectIsOpenMobileMenu} from '@redux/user/selectors'
import {useAppDispatch} from '@redux/store'
import {handleOpenMobileMenu} from '@redux/user/userSlice'

// * icons/logo
import logo from '@assets/logo.svg'
import {AiOutlineClose} from 'react-icons/ai'
import {BiMenu} from 'react-icons/bi'

// * components 
import AuthLogic from './AuthLogic'
import MobileMenu from './MobileMenu'

const Header = memo(() => {
    const isOpenMenu = useSelector(selectIsOpenMobileMenu)
    const dispatch = useAppDispatch()

    const handleOpenMobileMenuFunc = (): void => {
        dispatch(handleOpenMobileMenu())
    }

    return (
        <>
            <div className='flex items-center justify-between fixed h-20 w-full shadow-md px-10 z-50 bg-white'>
                <Link to='/'>
                    <img width='86' src={logo} alt="Logo" />
                </Link>
                <div className='hidden mini:block'>
                    <AuthLogic/>
                </div>
                <div 
                    onClick={handleOpenMobileMenuFunc}
                    className='block mini:hidden text-5xl cursor-pointer'
                >
                    {
                        isOpenMenu
                        ? <AiOutlineClose/>
                        : <BiMenu/>
                    }
                </div>
            </div>
            <MobileMenu/>
        </>
    )
})

export default Header