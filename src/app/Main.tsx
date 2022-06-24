import './Main.scss'
import {useState, useEffect} from 'react'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Loader from './components/Loader/Loader'
import AlertScreen from './components/AlertScreen/AlertScreen'
import {gql, useQuery} from '@apollo/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound/NotFound'

/* --------------- Apollo TYPES ---------------------*/
interface User {
	id: string
	name: string
	username: string
	password: string
}

interface UserData {
	users: User[]
}

/* -------------- Apollo QUERYS ---------------------*/
const DB_USERS_LOGIN = gql`
	query users {
		users {
			username
		}
	}
`

function Main(props: {URIGRAPHQL: string}) {
	/* -------------- GLOBAL THEME CONTROL --------------*/

	const [darkTheme, setDarkTheme] = useState(
		// window.sessionStorage.getItem('darkTheme')
		// 	? true
		// 	: !!window.matchMedia('(prefers-color-scheme: dark)').matches
		false
	)

	function setDarkThemeHandler() {
		setDarkTheme(!darkTheme)
		darkTheme
			? window.sessionStorage.removeItem('darkTheme')
			: window.sessionStorage.setItem('darkTheme', 'true')
		const mutation = `mutation{
      updateUser(id:"${currentUser.id}", changes:{darktheme: ${!darkTheme}})
    }`
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

	const [currentUser, setCurrentUser] = useState({
		id: window.sessionStorage.getItem('idCurrentUser'),
		username: window.sessionStorage.getItem('usernameCurrentUser'),
		password: window.sessionStorage.getItem('passwordCurrentUser'),
	})

	useEffect(() => {
		if (logUser.username && !logUser.password) {
			setDisplayAlert({
				style: {display: 'block'},
				msg: 'Escribe la contraseña',
				type: 'Error',
			})
		}
		if (!logUser.username && logUser.password) {
			setDisplayAlert({
				style: {display: 'block'},
				msg: 'Escribe el nombre de usuario, tu correo o tu número de telefono',
				type: 'Error',
			})
		}
		if (logUser.username && logUser.password) {
			validateUser()
		}
	}, [logUser.username, logUser.password])

	function closeSession() {
		window.sessionStorage.clear()
		setCurrentUser({
			id: '',
			username: '',
			password: '',
		})
		setLogUser({
			username: '',
			password: '',
		})
	}

	function saveSession(userId: string) {
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
		fetch(props.URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})
			.then(res => res.json())
			.then(data => {
				setCurrentUser({
					id: data.data.userById.id,
					username: data.data.userById.username,
					password: data.data.userById.password,
				})

				if (data.data.userById.darktheme === true) {
					setDarkTheme(true)
					window.sessionStorage.setItem('darkTheme', 'true')
				} else {
					setDarkTheme(false)
					window.sessionStorage.removeItem('darkTheme')
				}
				window.sessionStorage.setItem('idCurrentUser', data.data.userById.id)
				window.sessionStorage.setItem(
					'usernameCurrentUser',
					data.data.userById.username
				)
				window.sessionStorage.setItem(
					'passwordCurrentUser',
					data.data.userById.password
				)
			})
	}

	function validateUser() {
		const query = `
			query{
				validateUser(username: "${logUser.username}", password: "${logUser.password}")
			}
		`
		fetch(props.URIGRAPHQL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({query}),
		})
			.then(response => response.json())
			.then(data => {
				switch (data.data.validateUser) {
					case 'UserDoesNotExist':
						setDisplayAlert({
							style: {display: 'block'},
							msg: `¡No existe el usuario ${logUser.username}!`,
							type: 'Error',
						})
						break
					case 'IncorrectPassword':
						setDisplayAlert({
							style: {display: 'block'},
							msg: '¡Contraseña Incorrecta!',
							type: 'Error',
						})
						break
					case null:
						setDisplayAlert({
							style: {display: 'block'},
							msg: '¡Error de Consulta!',
							type: 'Error',
						})
						break
					default:
						saveSession(data.data.validateUser)
						break
				}
			})
	}

	/* -------------- GET USER LIST -----------------*/
	const queryArrayUsers = useQuery<UserData>(DB_USERS_LOGIN)

	const listOfExistentUsers: string[] = []
	queryArrayUsers.data?.users.map((User: any) => {
		return listOfExistentUsers.push(User.username)
	})

	/* -------------------- RENDER --------------------*/

	/* Alert Functions */
	function AlertScreenDisplay() {
		return (
			<div
				className='display_alertScreen setOver centerOnDisplay'
				style={displayAlert.style}
			>
				<AlertScreen
					darkTheme={darkTheme}
					type={displayAlert.type}
					msg={displayAlert.msg}
					handlerAlert={handlerAlert}
				/>
			</div>
		)
	}

	function handlerAlert() {
		setDisplayAlert({
			style: {display: 'none'},
			msg: '',
			type: '',
		})
	}

	const [displayAlert, setDisplayAlert] = useState({
		style: {display: 'none'},
		msg: '',
		type: '',
	})

	/* Loader Functions */
	function LoaderDisplay() {
		return (
			<div
				style={displayLoader}
				className={
					darkTheme
						? 'display_loader-dark setOver centerOnDisplay'
						: 'display_loader setOver centerOnDisplay'
				}
			>
				<Loader />
			</div>
		)
	}

	const [displayLoader, setDisplayLoader] = useState({})
	useEffect(() => {
		setTimeout(() => {
			setDisplayLoader({display: 'none'})
		}, 800)
	}, [])

	/*-------------------- Main Render ------------------------- */
	return (
		<div className='Main' data-global-theme={'dark'}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<Home
								darkTheme={darkTheme}
								currentUser={currentUser}
								setDarkThemeHandler={setDarkThemeHandler}
								closeSession={closeSession}
							/>
						}
					/>

					<Route
						path='login'
						element={
							<Login
								setLogUser={setLogUser}
								listOfExistentUsers={listOfExistentUsers}
								darkTheme={darkTheme}
								handleLoged={!!currentUser.id}
							/>
						}
					/>

					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>

			<AlertScreenDisplay />

			<LoaderDisplay />
		</div>
	)
}

export default Main
