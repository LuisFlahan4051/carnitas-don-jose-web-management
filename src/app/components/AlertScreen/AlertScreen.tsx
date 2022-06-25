import './AlertSceen.scss'
import iconOk from './icons/iconOk.svg'
import iconCancel from './icons/iconCancel.svg'
import iconQuestion from './icons/iconQuestion.svg'
import iconInfo from './icons/iconInfo.svg'
import iconWarning from './icons/iconWarning.svg'

function AlertScreen(props: {type: string; msg: string; handlerAlert: any}) {
	let icon: any

	switch (props.type) {
		case 'Success':
			icon = iconOk
			break
		case 'Error':
			icon = iconCancel
			break
		case 'Info':
			icon = iconInfo
			break
		case 'Question':
			icon = iconQuestion
			break
		case 'Warning':
			icon = iconWarning
			break
		default:
			icon = iconOk
			break
	}

	/* -------------- RENDER --------------*/
	return (
		<div className='AlertScreen'>
			<div className='alert__background'></div>

			<div className='alert__content' onClick={props.handlerAlert}>
				<div className='alert__target'>
					<img src={icon} alt='alert__icon' />
					<p className='alert__msg'>{props.msg}</p>
					<button className='alert__ok' onClick={props.handlerAlert}>
						OK
					</button>
				</div>
			</div>
		</div>
	)
}

export default AlertScreen
