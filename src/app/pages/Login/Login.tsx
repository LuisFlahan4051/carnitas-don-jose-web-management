/* eslint-disable no-undef */
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../../components/Login/Login'
import './Login.scss'
import {useUsersContext} from '../../context/Users/UsersContext'
import AlertScreen from '../../components/AlertScreen/AlertScreen'
import {useSystemContext} from '../../context/System/SystemContext'
import {User} from '../../generated/types/4-users'

export default function Login() {
	const navigate = useNavigate()

	const [passwordBuffered, setPasswordBuffered] = useState('')
	const [usernameBuffered, setUsernameBuffered] = useState('')
	const {currentUser, initSession}: any = useSystemContext()
	const {usernamesList}: any = useUsersContext()
	const userLoged: User = currentUser

	const {validateUser}: any = useUsersContext()

	useEffect(() => {
		console.log(userLoged.id)
		if (userLoged.id !== undefined) {
			navigate('/home', {
				replace: true,
			})
		}
	}, [userLoged.id])

	async function validateFormData(username: string, password: string) {
		const message = await validateUser(username, password)

		switch (message) {
			case 'Ok':
				initSession(username, password)
				break
			case 'NotExist':
				setDisplayAlert({
					display: true,
					msg: `¡No existe el usuario ${usernameBuffered}!`,
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
			case 'Deleted':
				setDisplayAlert({
					display: true,
					msg: '¡El usuario ha sido eliminado!',
					type: 'Error',
				})
				break
			case 'NotVerified':
				setDisplayAlert({
					display: true,
					msg: '¡El usuario aun no es verificado!',
					type: 'Error',
				})
				break
			default:
				setDisplayAlert({
					display: true,
					msg: '¡Error de Consulta!',
					type: 'Error',
				})
				break
		}
	}

	/* Alert Functions */

	useEffect(() => {
		if (usernameBuffered && !passwordBuffered) {
			setDisplayAlert({
				display: true,
				msg: 'Escribe la contraseña',
				type: 'Error',
			})
		}
		if (!usernameBuffered && passwordBuffered) {
			setDisplayAlert({
				display: true,
				msg: 'Escribe el nombre de usuario, tu correo o tu número de telefono',
				type: 'Error',
			})
		}
		if (usernameBuffered && passwordBuffered) {
			validateFormData(usernameBuffered, passwordBuffered)
		}
	}, [usernameBuffered, passwordBuffered])

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
				onSubmit={(username, password) => {
					setUsernameBuffered(username)
					setPasswordBuffered(password)
				}}
				listOfExistentUsers={usernamesList}
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
