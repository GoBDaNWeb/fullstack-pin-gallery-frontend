// * react 
import {Routes, Route} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

// * redux 
import {useSelector} from 'react-redux'
import {selectAuth} from './redux/user/selectors'
import {useGetAuthMeQuery} from './redux/user/userApi'
import {selectIsOpenModal} from './redux/user/selectors'

// * components 
import Header from './components/Header'
import NonAuthModal from './components/NonAuthModal'
import MainPage from './pages/Main'
import PinPage from './pages/Pin'
import UserProfilePage from './pages/UserProfile'
import AuthPage from './pages/Auth'
import CreatePinPage from './pages/CreatePin'

function App() {
	const location = useLocation()
	const isAuth = useSelector(selectAuth)
	const isOpenModal = useSelector(selectIsOpenModal)

	useGetAuthMeQuery()

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
			<Routes>
				<Route path='/' element={ <MainPage/>} />
				<Route path='/pin/:id' element={ <PinPage/>} />
				<Route path='/profile/:id' element={ <UserProfilePage/>} />
				<Route path='/auth' element={ <AuthPage/>} />
				<Route path='/create-pin' element={ <CreatePinPage/>} />
			</Routes>
		</>
	);
}

export default App;
