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

	const [currentUser, setCurrentUser] = useState({
		id: window.sessionStorage.getItem('idCurrentUser'),
		username: window.sessionStorage.getItem('usernameCurrentUser'),
		password: window.sessionStorage.getItem('passwordCurrentUser'),
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
				window.sessionStorage.setItem('darkTheme', data.data.userById.darktheme)
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
					<Route
						path='/'
						element={
							<Home
								currentUser={currentUser}
								darkTheme={darkTheme}
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
					onCancel={null}
					onClose={acceptingAlert}
				/>
			) : null}

			{displayLoader ? <Loader /> : null}
		</div>
	)
}

export default Main
