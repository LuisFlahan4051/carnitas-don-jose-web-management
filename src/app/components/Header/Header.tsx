import {useNavigate} from 'react-router-dom'
import './Header.scss'
import type {User} from '../../Types'

export default function Header(props: {
	currentUser: User
	closeSession: () => void
	setDarkThemeHandler: () => void
}) {
	const navigate = useNavigate()
	return (
		<div className='header'>
			<img></img>
			<p>{props.currentUser.username}</p>

			<button
				onClick={() => {
					props.closeSession()
					navigate('/login')
				}}
			>
				cerrar sesion
			</button>
			<button
				onClick={() => {
					props.setDarkThemeHandler()
				}}
			>
				Change Theme
			</button>
		</div>
	)
}
