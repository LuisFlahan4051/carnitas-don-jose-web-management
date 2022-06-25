import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.scss'
import IconBackgroundDark from './imgs/LogoFondoDark.svg'
import IconBackground from './imgs/LogoFondoWite.svg'
import IconUsers from './imgs/UsersIcon.svg'

function Home(props: {
	currentUser: any
	darkTheme: boolean
	setDarkThemeHandler: any
	closeSession: any
}) {
	const navigate = useNavigate()

	useEffect(() => {
		if (!props.currentUser.id) {
			navigate('/login')
		}
	}, [props.currentUser.id])

	/* -------------- RENDER --------------*/

	function Background() {
		return (
			<div className='background'>
				<img
					src={props.darkTheme ? IconBackgroundDark : IconBackground}
					alt='icon background'
					className='background__icon'
				/>
			</div>
		)
	}

	return (
		<div className='display_home'>
			<Background />
			<div className='Home'>
				<div className='Home__sesionInfoTarget'>
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
				<div className='Home__navbar'>nav</div>

				<div className='Home__options_container'>
					<button className='btn option_users'>
						<img src={IconUsers} alt='Icon Users' className='btn_icon' />
					</button>
					<button className='btn'>Button</button>
					<button onClick={props.setDarkThemeHandler}></button>
				</div>
			</div>
		</div>
	)
}

export default Home
