import './Main.scss'
import {useState, useEffect} from 'react'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Loader from './components/Loader/Loader'
//Check what happens with this import
import AlertScreen from './components/AlertScreen/AlertScreen'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import type {CurrentUser} from './Types'
import Workspace from './pages/Workspace/Workspace'
import UsersPage from './pages/Users/Users'

import {useUsersContext} from './context/Users/UsersContext'

function Main(props: {URIAPI: string}) {
	/* -------------- GLOBAL THEME CONTROL --------------*/

	const {usersNames}: any = useUsersContext()
	useEffect(() => {
		console.log(usersNames)
	}, [])

	const [darkTheme, setDarkTheme] = useState(
		window.sessionStorage.getItem('darkTheme') === 'false'
			? false
			: !!window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	function setDarkThemeHandler() {
		setDarkTheme(!darkTheme)
		darkTheme
			? window.sessionStorage.setItem('darkTheme', 'false')
			: window.sessionStorage.setItem('darkTheme', 'true')
		const mutation = `
			mutation{
      			updateUser(id:"${currentUser.id}", changes:{darktheme: ${!darkTheme}})
    		}
		`
		fetch(props.URIAPI, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query: mutation}),
		})
	}

	/* -------------- USER VALIDATION --------------*/
	const [logUser, setLogUser] = useState({
		username: '',
		password: '',
	})

	function setLogUserHandler(username: string, password: string) {
		setLogUser({
			username,
			password,
		})
	}

	function getSessionItem(item: string): string | null {
		return window.sessionStorage.getItem(`${item}User`)
			? window.sessionStorage.getItem(`${item}User`)
			: window.localStorage.getItem(`${item}User`)
	}

	const [currentUser, setCurrentUser] = useState({
		id: getSessionItem('idCurrent'),
		name: getSessionItem('nameCurrent'),
		lastname: getSessionItem('lastnameCurrent'),
		username: getSessionItem('usernameCurrent'),
		phone: getSessionItem('phoneCurrent'),
		mail: getSessionItem('mailCurrent'),
	})

	useEffect(() => {
		if (logUser.username && !logUser.password) {
			setDisplayAlert({
				display: true,
				msg: 'Escribe la contraseña',
				type: 'Error',
			})
		}
		if (!logUser.username && logUser.password) {
			setDisplayAlert({
				display: true,
				msg: 'Escribe el nombre de usuario, tu correo o tu número de telefono',
				type: 'Error',
			})
		}
		if (logUser.username && logUser.password) {
			validateUser()
		}
	}, [logUser.username, logUser.password])

	async function validateUser() {
		const query = `
			query{
				validateUser(username: "${logUser.username}", password: "${logUser.password}")
			}
		`
		const response = await fetch(props.URIAPI, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()

		switch (data.validateUser) {
			case 'UserDoesNotExist':
				setDisplayAlert({
					display: true,
					msg: `¡No existe el usuario ${logUser.username}!`,
					type: 'Error',
				})
				break
			case 'IncorrectPassword':
				setDisplayAlert({
					display: true,
					msg: '¡Contraseña Incorrecta!',
					type: 'Error',
				})
				break
			case null:
				setDisplayAlert({
					display: true,
					msg: '¡Error de Consulta!',
					type: 'Error',
				})
				break
			default:
				saveSession(data.validateUser)
				break
		}
	}

	function closeSession() {
		window.sessionStorage.clear()
		window.localStorage.clear()
		setCurrentUser({
			id: null,
			name: null,
			lastname: null,
			username: null,
			phone: null,
			mail: null,
		})
		setLogUser({
			username: '',
			password: '',
		})
	}

	async function saveSession(userId: string) {
		const query = `
          query{
            userById(id:"${userId}"){
              id
              name
              lastname
              username
              phone
			  mail
              darktheme
            }
          }
        `
		const response = await fetch(props.URIAPI, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()

		const user: CurrentUser = data.userById
		const storage = window.sessionStorage
		const local = window.localStorage

		setCurrentUser({
			id: user.id,
			name: user.name || null,
			lastname: user.lastname || null,
			username: user.username || null,
			phone: user.phone || null,
			mail: user.mail || null,
		})

		if (data.userById.darktheme === true) {
			setDarkTheme(true)
			storage.setItem('darkTheme', 'true')
		} else {
			setDarkTheme(false)
			storage.removeItem('darkTheme')
		}
		storage.setItem('darkTheme', data.userById.darktheme)
		storage.setItem('idCurrentUser', user.id || '')
		storage.setItem('usernameCurrentUser', user.username || '')

		local.setItem('darkTheme', data.userById.darktheme)
		local.setItem('idCurrentUser', user.id || '')
		local.setItem('usernameCurrentUser', user.username || '')
	}

	/* -------------------- RENDER --------------------*/
	/* Alert Functions */
	const [displayAlert, setDisplayAlert] = useState({
		display: false,
		msg: '',
		type: '',
	})

	/*function shootAlert(then: any, msg: string, type: string) {
		setDisplayAlert({
			display: true,
			msg,
			type,
		})
		setTimeout(() => {
			dropAlert()
			then()
		}, 1700)
	}*/

	function acceptingAlert() {
		dropAlert()
	}

	function dropAlert() {
		setDisplayAlert({
			display: false,
			msg: '',
			type: '',
		})
	}

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
					<Route
						path='home/*'
						element={
							<Home
								currentUser={currentUser}
								darkTheme={darkTheme}
								setDarkThemeHandler={setDarkThemeHandler}
								closeSession={closeSession}
							/>
						}
					>
						<Route
							path=''
							element={
								<Workspace
									setDarkThemeHandler={setDarkThemeHandler}
									type='target'
								/>
							}
						/>
						<Route path='users' element={<UsersPage UsersList={[]} />} />
					</Route>

					<Route
						path='login'
						element={
							<Login
								setLogUser={setLogUserHandler}
								listOfExistentUsers={usersNames}
								isLoged={!!currentUser.id}
							/>
						}
					/>

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>

			{displayLoader ? <Loader /> : null}
		</div>
	)
}

export default Main
