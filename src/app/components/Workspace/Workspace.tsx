import ButtonCircle from '../ButtonCircle/ButtonCircle'
import IconUsers from './imgs/UsersIcon.svg'
import './Workspace.scss'
import {useState} from 'react'
import AlertScreen from '../AlertScreen/AlertScreen'

export default function Workspace(props: {setDarkThemeHandler: any}) {
	const [displayAlert, setDisplayAlert] = useState(false)

	function sure() {
		console.log('sure')
		setDisplayAlert(false)
	}

	function dontsure() {
		console.log('dontsure')
		setDisplayAlert(false)
	}

	function onClickUsers() {
		console.log('onClickUsers')
	}

	function onClickOther() {
		console.log('onClickOther')
	}

	function onClickAlert() {
		console.log('onClickAlert')
		setDisplayAlert(true)
	}

	return (
		<div className='workspace'>
			<ButtonCircle
				color='#00FFF0'
				icon={IconUsers}
				alt='icon users'
				specificTheme='null'
				onClick={onClickUsers}
			/>
			<ButtonCircle
				color='#26FF8B'
				icon='null'
				alt='button'
				specificTheme='null'
				onClick={onClickOther}
			/>
			<ButtonCircle
				color='#7040C4'
				icon='null'
				alt='change theme'
				specificTheme='null'
				onClick={props.setDarkThemeHandler}
			/>
			<ButtonCircle
				color='#407BFF'
				icon='null'
				alt='send alert'
				specificTheme='null'
				onClick={onClickAlert}
			/>

			{displayAlert ? (
				<AlertScreen
					type='Question'
					msg='Are you sure you want to delete this workspace?'
					onAccept={sure}
					onCancel={dontsure}
					onClose={dontsure}
				/>
			) : null}
		</div>
	)
}
