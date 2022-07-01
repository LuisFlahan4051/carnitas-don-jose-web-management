import './ButtonCircle.scss'
import {useState} from 'react'

export default function ButtonCircle(props: {
	alt: string
	icon: any
	color: string
	specificTheme: string
	onClick: any
}) {
	const [isHover, setIsHover] = useState(false)

	const style = {
		borderColor: `${props.color}`,
	}
	const styleHover = {
		borderColor: `${props.color}`,
		backgroundColor: `${props.color}`,
	}

	return (
		<button
			className='btn-circle'
			style={isHover ? styleHover : style}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			data-button-circle-theme={props.specificTheme}
			onClick={props.onClick}
		>
			{props.icon !== null ? (
				<img src={props.icon} alt={props.alt} className='btn-circle_icon' />
			) : (
				props.alt
			)}
		</button>
	)
}
