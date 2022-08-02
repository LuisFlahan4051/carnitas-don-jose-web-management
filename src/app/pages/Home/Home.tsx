import {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import './Home.scss'
import IconBackgroundDark from './imgs/LogoFondoDark.svg'
import IconBackground from './imgs/LogoFondoWite.svg'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import {UserLoged} from '../../Types'
import Footer from '../../components/Footer/Footer'
import Directory from '../../components/Directory/Directory'

function Home(props: {
	currentUser: UserLoged
	darkTheme: boolean
	setDarkThemeHandler: () => void
	closeSession: () => void
}) {
	const navigate = useNavigate()

	useEffect(() => {
		if (!props.currentUser.id) {
			navigate('/login', {
				replace: true,
			})
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
						setDarkThemeHandler={props.setDarkThemeHandler}
					/>
				</div>

				<div className='display_home__navbar'>
					<Navbar />
				</div>

				<div className='display_home__directory'>
					<Directory />
				</div>

				<div className='display_home__workspace'>
					<Outlet />
				</div>
				<div className='display_home__footer'>
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default Home
