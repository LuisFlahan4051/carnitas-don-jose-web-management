import {useNavigate} from 'react-router-dom'
import './Header.scss'

export default function Header(props: {currentUser: any; closeSession: any}) {
	const navigate = useNavigate()
	return (
		<div className='header'>
			{'Usuario: ' + props.currentUser.username}
			<button
				onClick={() => {
					props.closeSession()
					navigate('/login')
				}}
			>
				cerrar sesion
			</button>
		</div>
	)
}
