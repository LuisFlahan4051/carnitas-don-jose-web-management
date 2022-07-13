import ButtonCircle from '../ButtonCircle/ButtonCircle'
import IconUsers from './imgs/UsersIcon.svg'
import './Workspace.scss'
import {useState} from 'react'
import AlertScreen from '../AlertScreen/AlertScreen'
import ButtonTarget from '../ButtonTarget/ButtonTarget'

export default function Workspace(props: {
	setDarkThemeHandler: () => void
	type: string
}) {
	const [displayAlert, setDisplayAlert] = useState(false)

	function sure() {
		console.log('sure')
		setDisplayAlert(false)
	}

	function dontsure() {
		console.log('dontsure')
		setDisplayAlert(false)
	}

	function onClickAlert() {
		console.log('onClickAlert')
		setDisplayAlert(true)
	}

	if (props.type === 'target') {
		return (
			<div className='workspace'>
				<ButtonTarget
					title='Usuarios'
					icon={IconUsers}
					specificTheme='null'
					onClick={null}
					to='/home/users'
				/>
				<ButtonTarget
					title='Other'
					icon={null}
					specificTheme='null'
					onClick={null}
					to='/home/other'
				/>
			</div>
		)
	}

	return (
		<div className='workspace'>
			<ButtonCircle
				color='#00FFF0'
				icon={IconUsers}
				title='Usuarios'
				specificTheme='null'
				onClick={null}
				to='/home/users'
			/>
			<ButtonCircle
				color='#26FF8B'
				icon={null}
				title='Simple Button'
				specificTheme='null'
				onClick={null}
				to='/home/other'
			/>
			<ButtonCircle
				color='#7040C4'
				icon={null}
				title='Change Theme'
				specificTheme='null'
				onClick={props.setDarkThemeHandler}
				to=''
			/>
			<ButtonCircle
				color='#407BFF'
				icon={null}
				title='Send Alert'
				specificTheme='null'
				onClick={onClickAlert}
				to=''
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
