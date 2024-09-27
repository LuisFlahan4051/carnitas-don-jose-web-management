import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import './Header.scss'
import {useSystemContext} from '../../context/System/SystemContext'
import {User} from '../../generated/types/4-users'

export default function Header(props: {}) {
	const {setDarkThemeHandler, closeSession, currentUser}: any =
		useSystemContext()
	const userLoged: User = currentUser
	const navigate = useNavigate()
	const [showOptions, setShowOptions] = useState(false)

	function OptionsDisplay() {
		return (
			<>
				<div className='options_row'>
					<svg
						viewBox='0 0 36 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M18 0L35.3205 30H0.679491L18 0Z' />
					</svg>
				</div>
				<div className='options_container'>
					<button
						onClick={() => {
							setDarkThemeHandler()
							setShowOptions(!showOptions)
						}}
						className='options_button'
					>
						Change Theme
					</button>

					<button
						onClick={() => {
							closeSession()
							navigate('/login')
							setShowOptions(!showOptions)
						}}
						className='options_button'
					>
						Cerrar Sesión
					</button>
				</div>
			</>
		)
	}

	return (
		<div className='header'>
			<div className='header__options'>
				<button
					className='options_profile-button'
					onClick={() => setShowOptions(!showOptions)}
					onKeyDown={(e: {key: any}) => {
						if (e.key === 'Escape') setShowOptions(false)
					}}
				>
					<img
						className='options_profile-picture'
						//src='https://yt3.ggpht.com/ytc/AKedOLRAXBHJqs3xjDliRHeSgZcREGFNfG7VImUpHsG3MA=s900-c-k-c0x00ffffff-no-rj'
						src='../../../profile.jpg'
						alt='User Profile Picture'
					/>
				</button>
				{showOptions ? <OptionsDisplay /> : null}
			</div>

			<p className='header__profile-name'>{userLoged.username}</p>
		</div>
	)
}
