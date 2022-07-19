import './Main.scss'
import {useState, useEffect} from 'react'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Loader from './components/Loader/Loader'
import AlertScreen from './components/AlertScreen/AlertScreen'
import {gql, useQuery} from '@apollo/client'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'
import type {User} from './Types'
import Workspace from './pages/Workspace/Workspace'
import UsersPage from './pages/Users/Users'

/* --------------- Apollo TYPES ---------------------*/

interface Users {
	users: User[]
}

function Main(props: {URIGRAPHQL: string}) {
	/* -------------- GLOBAL THEME CONTROL --------------*/

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
		fetch(props.URIGRAPHQL, {
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

	const [currentUser, setCurrentUser] = useState({
		id: window.sessionStorage.getItem('idCurrentUser')
			? window.sessionStorage.getItem('idCurrentUser')
			: window.localStorage.getItem('idCurrentUser'),
		name: window.sessionStorage.getItem('nameCurrentUser')
			? window.sessionStorage.getItem('nameCurrentUser')
			: window.localStorage.getItem('nameCurrentUser'),
		lastname: window.sessionStorage.getItem('lastnameCurrentUser')
			? window.sessionStorage.getItem('lastnameCurrentUser')
			: window.localStorage.getItem('lastnameCurrentUser'),
		username: window.sessionStorage.getItem('usernameCurrentUser')
			? window.sessionStorage.getItem('usernameCurrentUser')
			: window.localStorage.getItem('usernameCurrentUser'),
		password: window.sessionStorage.getItem('passwordCurrentUser')
			? window.sessionStorage.getItem('passwordCurrentUser')
			: window.localStorage.getItem('passwordCurrentUser'),
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
		const response = await fetch(props.URIGRAPHQL, {
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
			password: null,
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
              password
              darktheme
            }
          }
        `
		const response = await fetch(props.URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})

		const {data} = await response.json()

		const user: User = data.userById
		const storage = window.sessionStorage
		const local = window.localStorage

		setCurrentUser({
			id: user.id || null,
			name: user.name || null,
			lastname: user.lastname || null,
			username: user.username || null,
			password: user.password || null,
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
		storage.setItem('passwordCurrentUser', user.password || '')

		local.setItem('darkTheme', data.userById.darktheme)
		local.setItem('idCurrentUser', user.id || '')
		local.setItem('usernameCurrentUser', user.username || '')
		local.setItem('passwordCurrentUser', user.password || '')
	}

	/* -------------- GET USER LIST -----------------*/
	const {data} = useQuery<Users>(gql`
		query users {
			users {
				username
				name
				lastname
			}
		}
	`)
	const users: User[] = data?.users ?? []

	const listOfExistentUsers: string[] = []
	const UsersList: User[] = []

	users.map((User: User) => {
		UsersList.push({
			id: User.id,
			username: User.username,
			name: User.name,
			lastname: User.lastname,
			password: User.password,
		})
		listOfExistentUsers.push(User.username ?? '')
		return null
	})

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
						<Route path='users' element={<UsersPage UsersList={UsersList} />} />
					</Route>

					<Route
						path='login'
						element={
							<Login
								setLogUser={setLogUserHandler}
								listOfExistentUsers={listOfExistentUsers}
								isLoged={!!currentUser.id}
							/>
						}
					/>

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>

			{displayAlert.display ? (
				<AlertScreen
					type={displayAlert.type}
					msg={displayAlert.msg}
					onAccept={acceptingAlert}
					onCancel={() => {}}
					onClose={acceptingAlert}
				/>
			) : null}

			{displayLoader ? <Loader /> : null}
		</div>
	)
}

export default Main
