import './AlertSceen.scss'
import iconOk from './icons/iconOk.svg'
import iconCancel from './icons/iconCancel.svg'
import iconQuestion from './icons/iconQuestion.svg'
import iconInfo from './icons/iconInfo.svg'
import iconWarning from './icons/iconWarning.svg'
import {useEffect, useRef} from 'react'

function AlertScreen(props: {
	type: string
	msg: string
	onAccept: any
	onCancel: any
	onClose: any
}) {
	const inputOk = useRef(document.createElement('button'))

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

	useEffect(() => {
		inputOk.current.focus()
	}, [])

	/* -------------- RENDER --------------*/
	return (
		<div className='AlertScreen'>
			<div className='alert__background' onClick={props.onClose}></div>

			<div className='alert__content'>
				<div className='alert__target'>
					<img src={icon} alt='alert__icon' />
					<p className='alert__msg'>{props.msg}</p>
					<div className='alert__buttons'>
						{props.type === 'Question' || props.type === 'Warning' ? (
							<>
								<button
									className='alert-btn alert__acept'
									onClick={props.onAccept}
									ref={inputOk}
									onKeyDown={e => {
										if (e.key === 'ArrowRight') {
											console.log('Right')
										}
									}}
								>
									Aceptar
								</button>
								<button
									className='alert-btn alert__cancel'
									onClick={props.onCancel}
								>
									Cancelar
								</button>
							</>
						) : (
							<button
								className='alert-btn alert__ok'
								onClick={props.onAccept}
								ref={inputOk}
							>
								OK
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlertScreen
