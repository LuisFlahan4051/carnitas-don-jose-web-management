import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.scss'
import IconBackgroundDark from './imgs/LogoFondoDark.svg'
import IconBackground from './imgs/LogoFondoWite.svg'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Workspace from '../../components/Workspace/Workspace'

function Home(props: {
	currentUser: any
	darkTheme: boolean
	setDarkThemeHandler: any
	closeSession: any
	setDisplayAlert: any
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
				<div className='display_home__header'>
					<Header
						currentUser={props.currentUser}
						closeSession={props.closeSession}
					/>
				</div>

				<div className='display_home__navbar'>
					<Navbar />
				</div>

				<div className='display_home__workspace'>
					<Workspace
						setDarkThemeHandler={props.setDarkThemeHandler}
						setDisplayAlert={props.setDisplayAlert}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
