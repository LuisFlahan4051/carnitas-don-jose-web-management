import {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import './Home.scss'
import IconBackgroundDark from './imgs/LogoFondoDark.svg'
import IconBackground from './imgs/LogoFondoWite.svg'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Directory from '../../components/Directory/Directory'
import {useSystemContext} from '../../context/System/SystemContext'
import {User} from '../../generated/types/4-users'

function Home() {
	const navigate = useNavigate()

	const {currentUser, darkTheme, initSession}: any = useSystemContext()
	const userLoged: User = currentUser

	useEffect(() => {
		if (!userLoged.id) {
			if (!window.sessionStorage.getItem('usernameCarnitas')) {
				navigate('/login', {
					replace: true,
				})
			} else {
				initSession(
					window.sessionStorage.getItem('usernameCarnitas'),
					window.sessionStorage.getItem('passwordCarnitas')
				)
			}
		}
	}, [userLoged.id])

	/* -------------- RENDER --------------*/

	function Background() {
		return (
			<div className='background'>
				<img
					src={darkTheme ? IconBackgroundDark : IconBackground}
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
					<Header />
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
