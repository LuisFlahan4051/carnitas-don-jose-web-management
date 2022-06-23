/* eslint-disable no-undef */
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../../components/Login/Login'
import './Login.scss'

export default function Login(props: {
	setLogUser: Function
	listOfExistentUsers: React.ReactNode[]
	darkTheme: boolean
	handleLoged: boolean
}) {
	const navigate = useNavigate()

	useEffect(() => {
		if (props.handleLoged) {
			navigate('/')
		}
	}, [props.handleLoged])

	return (
		<div
			className={
				props.darkTheme
					? 'display_login-dark setMainFrame centerOnDisplay'
					: 'display_login setMainFrame centerOnDisplay'
			}
		>
			<LoginForm
				setLogUser={props.setLogUser}
				listOfExistentUsers={props.listOfExistentUsers}
				darkTheme={props.darkTheme}
			/>
		</div>
	)
}
