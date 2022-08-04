/* eslint-disable no-undef */
import {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../../components/Login/Login'
import './Login.scss'
import {useUsersContext} from '../../context/Users/UsersContext'
import AlertScreen from '../../components/AlertScreen/AlertScreen'

export default function Login(props: {
	setLogUser: (username: string, password: string) => void
	listOfExistentUsers: string[]
	isLoged: boolean
}) {
	const {loginData, validateUser, saveSession}: any = useUsersContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (props.isLoged) {
			navigate('/home', {
				replace: true,
			})
		}

		const response = validateUser(loginData.username, loginData.password)
		switch (response) {
			case 'UserDoesNotExist':
				setDisplayAlert({
					display: true,
					msg: `¡No existe el usuario ${loginData.username}!`,
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
				saveSession(response)
				break
		}
	}, [props.isLoged])

	/* Alert Functions */

	useEffect(() => {
		if (loginData.username && !loginData.password) {
			setDisplayAlert({
				display: true,
				msg: 'Escribe la contraseña',
				type: 'Error',
			})
		}
		if (!loginData.username && loginData.password) {
			setDisplayAlert({
				display: true,
				msg: 'Escribe el nombre de usuario, tu correo o tu número de telefono',
				type: 'Error',
			})
		}
		if (loginData.username && loginData.password) {
			validateUser()
		}
	}, [loginData.username, loginData.password])

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

	return (
		<div className='display_login setMainFrame centerOnDisplay'>
			<LoginForm
				setLogUser={props.setLogUser}
				listOfExistentUsers={props.listOfExistentUsers}
			/>

			{displayAlert.display ? (
				<AlertScreen
					type={displayAlert.type}
					msg={displayAlert.msg}
					onAccept={acceptingAlert}
					onCancel={() => {}}
					onClose={acceptingAlert}
				/>
			) : null}
		</div>
	)
}
