import ButtonCircle from '../ButtonCircle/ButtonCircle'
import IconUsers from './imgs/UsersIcon.svg'
import './Workspace.scss'

export default function Workspace(props: {
	setDarkThemeHandler: any
	setDisplayAlert: any
	callback: any
}) {
	function onClickUsers() {
		console.log('onClickUsers')
	}

	function onClickOther() {
		console.log('onClickOther')
	}

	function onClickAlert() {
		props.setDisplayAlert({
			style: {display: 'block'},
			msg: '¡Carlos es puto!',
			type: 'Question',
		})
	}

	function callback() {
		props.callback(
			() => {
				console.log('callbackResponse')
			},
			'¡Sending Callback!',
			'Question'
		)
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
			<ButtonCircle
				color='#456BFF'
				icon='null'
				alt='Use a callback'
				specificTheme='null'
				onClick={callback}
			/>
		</div>
	)
}
