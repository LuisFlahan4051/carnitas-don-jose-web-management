/* eslint-disable no-undef */
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import LoginForm from '../../components/Login/Login'
import './Login.scss'

export default function Login(props: {
	setLogUser: (username: string, password: string) => void
	listOfExistentUsers: React.ReactNode[]
	isLoged: boolean
}) {
	const navigate = useNavigate()

	useEffect(() => {
		if (props.isLoged) {
			navigate('/home')
		}
	}, [props.isLoged])

	return (
		<div className='display_login setMainFrame centerOnDisplay'>
			<LoginForm
				setLogUser={props.setLogUser}
				listOfExistentUsers={props.listOfExistentUsers}
			/>
		</div>
	)
}
