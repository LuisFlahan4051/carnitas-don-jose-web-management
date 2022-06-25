/* eslint-disable no-undef */
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../../components/Login/Login'
import './Login.scss'

export default function Login(props: {
	setLogUser: any
	listOfExistentUsers: React.ReactNode[]
	handleLoged: boolean
}) {
	const navigate = useNavigate()

	useEffect(() => {
		if (props.handleLoged) {
			navigate('/')
		}
	}, [props.handleLoged])

	return (
		<div className='display_login setMainFrame centerOnDisplay'>
			<LoginForm
				setLogUser={props.setLogUser}
				listOfExistentUsers={props.listOfExistentUsers}
			/>
		</div>
	)
}
