import ButtonCircle from '../ButtonCircle/ButtonCircle'
import IconUsers from './imgs/UsersIcon.svg'
import './Workspace.scss'
import {useState} from 'react'
import AlertScreen from '../AlertScreen/AlertScreen'
import ButtonTarget from '../ButtonTarget/ButtonTarget'
import {useNavigate} from 'react-router-dom'

export default function Workspace(props: {
	setDarkThemeHandler: () => void
	type: string
}) {
	const [displayAlert, setDisplayAlert] = useState(false)
	const navigate = useNavigate()

	function sure() {
		console.log('sure')
		setDisplayAlert(false)
	}

	function dontsure() {
		console.log('dontsure')
		setDisplayAlert(false)
	}

	function onClickUsers() {
		navigate('/home/users')
	}

	function onClickOther() {
		console.log('onClickOther')
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
					onClick={onClickUsers}
				/>
				<ButtonTarget
					title='Other'
					icon={null}
					specificTheme='null'
					onClick={onClickOther}
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
				onClick={onClickUsers}
			/>
			<ButtonCircle
				color='#26FF8B'
				icon={null}
				title='Simple Button'
				specificTheme='null'
				onClick={onClickOther}
			/>
			<ButtonCircle
				color='#7040C4'
				icon={null}
				title='Change Theme'
				specificTheme='null'
				onClick={props.setDarkThemeHandler}
			/>
			<ButtonCircle
				color='#407BFF'
				icon={null}
				title='Send Alert'
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
