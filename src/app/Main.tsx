import './Main.scss'
import {useState, useEffect} from 'react'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Loader from './components/Loader/Loader'
//Check what happens with this import
//import AlertScreen from './components/AlertScreen/AlertScreen'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import Workspace from './pages/Workspace/Workspace'
import UsersPage from './pages/Users/Users'
import {useSystemContext} from './context/System/SystemContext'

function Main(props: {URIAPI: string}) {
	/* -------------- GLOBAL THEME CONTROL --------------*/
	const {darkTheme}: any = useSystemContext()

	/* -------------------- RENDER --------------------*/

	/* Loader Functions */

	const [displayLoader, setDisplayLoader] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			setDisplayLoader(false)
		}, 800)
	}, [])

	/*-------------------- Main Render ------------------------- */
	return (
		<div className='Main' data-global-theme={darkTheme ? 'dark' : 'light'}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to='login' replace={true} />} />
					<Route path='home/*' element={<Home />}>
						<Route path='' element={<Workspace type='target' />} />
						<Route path='users' element={<UsersPage />} />
					</Route>

					<Route path='login' element={<Login />} />

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>

			{displayLoader ? <Loader /> : null}
		</div>
	)
}

export default Main
