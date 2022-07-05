import './ButtonTarget.scss'

export default function ButtonTarget(props: {
	title: string
	icon: string | null
	specificTheme: string
	onClick: () => void
}) {
	return (
		<button
			title={props.title}
			className='ButtonTarget'
			data-button-target-theme={props.specificTheme}
			onClick={props.onClick}
		>
			{props.icon !== null ? (
				<img src={props.icon} alt={props.title} className='ButtonTarget_icon' />
			) : (
				props.title
			)}
		</button>
	)
}
