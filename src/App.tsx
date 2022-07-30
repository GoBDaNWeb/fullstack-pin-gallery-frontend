// * react 
import {Routes, Route} from 'react-router-dom'

// * redux 
import {useGetAuthMeQuery} from './redux/user/userApi'

// * components 
import Layout from './components/layout/Layout'
import MainPage from './pages/Main'
import PinPage from './pages/Pin'
import UserProfilePage from './pages/UserProfile'
import AuthPage from './pages/Auth'
import CreatePinPage from './pages/CreatePin'

function App() {
	useGetAuthMeQuery()

	return (
		<Layout>
			
			<Routes>
				<Route path='/' element={ <MainPage/>} />
				<Route path='/pin/:id' element={ <PinPage/>} />
				<Route path='/profile/:id' element={ <UserProfilePage/>} />
				<Route path='/auth' element={ <AuthPage/>} />
				<Route path='/create-pin' element={ <CreatePinPage/>} />
			</Routes>
		</Layout>
	);
}

export default App;
